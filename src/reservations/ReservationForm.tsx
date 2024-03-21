import "./ReservationForm.css";
import { useEffect, useState } from "react";
import {
  Reservation,
  addReservation,
  Price,
  getPrices,
  Customer,
  getCustomers,
} from "../services/ReservationApiFacade";
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
  const [reservationFormData, setReservationFormData] =
    useState<Reservation>(EMPTY_RESERVATION);
  const [shows, setShows] = useState<show[]>([]);
  const [moviesData, setMoviesData] = useState<movie[]>([]);
  // const [theatresData, setTheatreData] = useState<theatre[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);
  const [totalPrice, setTotalprice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [ticket, setTicket] = useState("");
  const [chosenShowId, setChosenShowId] = useState(0);
  const [chosenCustomerId, setChosenCustomerId] = useState(0);
  const [showsDialogActive, setShowsDialogActive] = useState(false);
  const [customersDialogActive, setCustomersDialogActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const showsResponse = await getShows();
        const ticketsResponse = await getPrices();
        const customersResponse = await getCustomers();
        const movies = await movieData();
        // const theatres = await theatreData();
        setShows(showsResponse);
        setPrices(ticketsResponse);
        setCustomers(customersResponse);
        setMoviesData(movies);
        // setTheatreData(theatres);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    handlePriceChange();
  }, [ticket, amount, handlePriceChange]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handlePriceChange() {
    //Function works despite warning
    let price = 0;
    if (amount != 0) {
      for (let i = 0; i < prices.length; i++) {
        if (prices[i].name === ticket) {
          price += prices[i].price;
        }
        if (amount <= 5 && prices[i].name === "reservation_fee") {
          price += prices[i].price;
        } else if (amount >= 10 && prices[i].name === "group_discount") {
          const discount = prices[i].percent;
          price -= (price * discount) / 100;
        }
        for (const movie of moviesData) {
          if (
            movie.id ===
              shows.find((show) => show.id === chosenShowId)?.movie.id &&
            movie.is3D &&
            prices[i].name === "3d_fee"
          ) {
            price = (price + prices[i].price) * amount;
            break;
          } else {
            price *= amount;
            break;
          }
        }
      }
    }
    setTotalprice(price);
  }

  const ShowsList = () => {
    return shows.map((show) => (
      <button
        key={`show-${show.id}`}
        onClick={() => handleShowChange(show.id || 0)}
      >
        {} - {show.date}
      </button>
    ));
  };
  const CustomersList = () => {
    return customers.map((customer) => (
      <button
        key={`customer-${customer.id}`}
        onClick={() => handleCustomerChange(customer.id || 0)}
      >
        {customer.id} - {customer.first_name} - {customer.last_name} -{" "}
        {customer.email} - {customer.phone_number}
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
      setTicket(value);
    } else if (name === "ticket_amount") {
      setAmount(parseInt(value));
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
      <h2>Reservations</h2>
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
          id="cowboy_ticket"
          value="cowboy_ticket"
          onChange={handleReservationFormChange}
        />
        <label htmlFor="cowboy_ticket">Cowboy-billet</label>
        <input
          type="radio"
          name="ticket"
          id="sofa_ticket"
          value="sofa_ticket"
          onChange={handleReservationFormChange}
        />
        <label htmlFor="sofa_ticket">Sofa-billet</label>
        <input
          type="radio"
          name="ticket"
          id="standard_ticket"
          value="standard_ticket"
          onChange={handleReservationFormChange}
        />
        <label htmlFor="standard_ticket">Standard-billet</label>
        {/* Amount */}
        <label htmlFor="ticketAmount">Antal billetter:</label>
        <input
          type="number"
          name="ticket_amount"
          id="ticket_amount"
          onChange={handleReservationFormChange}
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
