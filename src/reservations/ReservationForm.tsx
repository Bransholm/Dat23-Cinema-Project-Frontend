import "./ReservationForm.css";
import { useEffect, useState } from "react";
import {
  Reservation,
  addReservation,
  getReservation,
} from "../services/ReservationApiFacade";
import { useLocation } from "react-router-dom";
import {
  ShowInterfaceTheatre,
  getShows,
  show,
  showInterface,
} from "../services/showAPI";
import { getMovies, movie } from "../services/movieApi";
import { Customer, getCustomers } from "../services/customerApiFacade";
import { Price, getPrices } from "../services/pricesApiFacade";
// import { theatre } from "../services/theatreAPItest";

const EMPTY_RESERVATION = {
  id: null,
  show_id: 0,
  customer_id: 0,
  total_price: 0,
  time_stamp: null,
  ticket: "",
  ticket_amount: 0,
};

export default function ReservationForm() {
  const { state } = useLocation();
  const reservationId = state?.id;
  const [isEditReservationClicked, setIsEditReservationClicked] = useState(
    state?.isEditReservationClicked
  );
  const [reservationFormData, setReservationFormData] =
    useState<Reservation>(EMPTY_RESERVATION);
  const [shows, setShows] = useState<
    (show | showInterface | ShowInterfaceTheatre)[]
  >([]);
  const [moviesData, setMoviesData] = useState<movie[]>([]);
  // const [theatresData, setTheatreData] = useState<theatre[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [prices, setPrices] = useState<Price>();
  const [totalPrice, setTotalprice] = useState(0);
  const [chosenAmount, setChosenAmount] = useState(0);
  const [chosenTicket, setChosenTicket] = useState("");
  const [chosenShowId, setChosenShowId] = useState(0);
  const [chosenCustomerId, setChosenCustomerId] = useState(0);
  const [showsDialogActive, setShowsDialogActive] = useState(false);
  const [customersDialogActive, setCustomersDialogActive] = useState(false);

  useEffect(() => {
    if (isEditReservationClicked && !reservationFormData.id) {
      const fetchReservation = async () => {
        try {
          const fetchReservation = await getReservation(reservationId);
          setReservationFormData(fetchReservation);
          setChosenShowId(fetchReservation.show_id);
          setChosenCustomerId(fetchReservation.customer_id);
          setChosenTicket(fetchReservation.ticket);
          setChosenAmount(fetchReservation.ticket_amount);
          setTotalprice(fetchReservation.total_price);
        } catch (error) {
          console.error("Error fetching reservation: " + reservationId);
        }
      };
      fetchReservation();
    }
    setIsEditReservationClicked(false);
  }, [
    reservationId,
    reservationFormData.id,
    reservationFormData,
    isEditReservationClicked,
    setIsEditReservationClicked,
    setChosenShowId,
    setChosenCustomerId,
    setChosenTicket,
    setChosenAmount,
    setTotalprice,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const showsResponse = await getShows();
        const pricesResponse = await getPrices();
        const customersResponse = await getCustomers();
        const moviesResponse = await getMovies();
        // const theatres = await theatreData();
        setShows(showsResponse);
        setPrices(pricesResponse);
        setCustomers(customersResponse);
        setMoviesData(moviesResponse);
        // setTheatreData(theatres);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    handlePriceChange();
  }, [chosenTicket, chosenAmount, handlePriceChange]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handlePriceChange() {
    //Function works despite warning
    let price = 0;

    if (prices && chosenAmount != 0 && chosenTicket != "") {
      const priceKeys = Object.keys(prices);

      for (const key of priceKeys) {
        const priceValue = prices[key];

        if (priceValue != null) {
          if (
            key === chosenTicket ||
            (key === "fee_expedition" && chosenAmount <= 5) ||
            (key === "fee_3d" &&
              moviesData.find(
                (movie) =>
                  movie.id ===
                  shows.find((show) => show.id === chosenShowId)?.movie.id
              )?.threeD)
          ) {
            price += priceValue;
          } else if (key === "discount_group" && chosenAmount >= 10) {
            price -= (price * priceValue) / 100;
          }
        }
      }
      price *= chosenAmount;
    }
    setTotalprice(price);
  }

  const ShowsList = () => {
    return shows.map((show) => (
      <button
        key={`show-${show.id}`}
        onClick={() => handleShowChange(show.id || 0)}
      >
        {show.movie.title} - {show.date}
      </button>
    ));
  };
  const CustomersList = () => {
    return customers.map((customer) => (
      <button
        key={`customer-${customer.id}`}
        onClick={() => handleCustomerChange(customer.id || 0)}
      >
        {customer.email}
      </button>
    ));
  };
  function handleShowChange(showId: number) {
    setChosenShowId(showId);
    setShowsDialogActive(false);
  }
  function handleCustomerChange(customerId: number) {
    setChosenCustomerId(customerId);
    setCustomersDialogActive(false);
  }

  function handleShowsDialogClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowsDialogActive(true);
  }
  function handleCustomersDialogClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setCustomersDialogActive(true);
  }
  function handleCloseDialog(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowsDialogActive(false);
    setCustomersDialogActive(false);
  }

  const handleReservationFormChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setReservationFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === "ticket") {
      setChosenTicket(value);
    } else if (name === "ticket_amount") {
      setChosenAmount(parseInt(value));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reservationFormData.time_stamp = new Date();
    reservationFormData.total_price = totalPrice;
    reservationFormData.customer_id = chosenCustomerId;
    reservationFormData.show_id = chosenShowId;
    const newReservation = await addReservation(reservationFormData);
    setReservationFormData({ ...EMPTY_RESERVATION });
    console.info("New/Edited Reservation", newReservation);
    console.log(reservationFormData);
  };

  return (
    <>
      <h2>
        Reservation til{" "}
        {
          moviesData.find(
            (movie) =>
              movie.id ===
              shows.find((show) => show.id === chosenShowId)?.movie.id
          )?.title
        }
        {moviesData.find(
          (movie) =>
            movie.id ===
            shows.find((show) => show.id === chosenShowId)?.movie.id
        )?.threeD ? (
          <span> - 3D</span>
        ) : null}
      </h2>
      <form id="reservationForm">
        <button id="choose-show-btn" onClick={handleShowsDialogClick}>
          Vælg Show
        </button>
        <h4>Valgt show: {chosenShowId}</h4>
        {/* Ticket options */}
        <h4>Billet:</h4>
        <input
          type="radio"
          name="ticket"
          id="ticket_medium"
          value="ticket_medium"
          onChange={handleReservationFormChange}
          checked={reservationFormData.ticket === "ticket_medium"}
        />
        <label htmlFor="cowboy_ticket">Cowboy-billet</label>
        <input
          type="radio"
          name="ticket"
          id="ticket_expensive"
          value="ticket_expensive"
          onChange={handleReservationFormChange}
          checked={reservationFormData.ticket === "ticket_expensive"}
        />
        <label htmlFor="sofa_ticket">Sofa-billet</label>
        <input
          type="radio"
          name="ticket"
          id="ticket_cheap"
          value="ticket_cheap"
          onChange={handleReservationFormChange}
          checked={reservationFormData.ticket === "ticket_cheap"}
        />
        <label htmlFor="standard_ticket">Standard-billet</label>
        {/* Amount */}
        <label htmlFor="ticketAmount">Antal billetter:</label>
        <input
          type="number"
          name="ticket_amount"
          id="ticket_amount"
          onChange={handleReservationFormChange}
          value={reservationFormData.ticket_amount}
        />
        <button id="choose-customer-btn" onClick={handleCustomersDialogClick}>
          Vælg kunde
        </button>
        <h4>Valgt kunde: {chosenCustomerId}</h4>
        <br />
        <button className="reservation-form-submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <h3>Total: {totalPrice.toFixed(2)} kr.</h3>
      {/* Dialog for shows */}
      <dialog id="showsDialog" open={showsDialogActive}>
        <ShowsList></ShowsList>
        <button onClick={handleCloseDialog}>X</button>
      </dialog>
      <dialog id="customersDialog" open={customersDialogActive}>
        <CustomersList></CustomersList>
        <button onClick={handleCloseDialog}>X</button>
      </dialog>
    </>
  );
}
