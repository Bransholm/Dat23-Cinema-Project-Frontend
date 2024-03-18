import "./ReservationForm.css";
import { useEffect, useState } from "react";
import {
  Show,
  Reservation,
  getShows,
  addReservation,
  Price,
  getTickets,
} from "../services/apiFacade";

const EMPTY_RESERVATION = {
  id: null,
  showId: null,
  customer: {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: 0,
  },
  totalPrice: 0,
  timeStamp: null,
  ticket: "",
  ticketAmount: 0,
};

export default function ReservationForm() {
  const [reservationFormData, setReservationFormData] =
    useState<Reservation>(EMPTY_RESERVATION);
  const [shows, setShows] = useState<Show[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);
  const [totalPrice, setTotalprice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [ticket, setTicket] = useState("");
  const [chosenShowId, setChosenShowId] = useState(0);
  const [showsDialogActive, setShowsDialogActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const showsResponse = await getShows();
        const ticketsResponse = await getTickets(); // Assuming there's a function to fetch tickets
        setShows(showsResponse);
        setPrices(ticketsResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    handlePriceChange();
  }, [ticket, amount, prices, handlePriceChange]);

  function handlePriceChange() {
    let price = 0;
    for (let i = 0; i < prices.length; i++) {
      if (prices[i].name === ticket) {
        price += prices[i].price;
      }
      if (amount && amount != 0) {
        price *= amount;
        if (amount <= 5 && prices[i].name === "reservation_fee") {
          price += prices[i].price;
        } else if (amount >= 10 && prices[i].name === "group_discount") {
          const discount = parseFloat(prices[i].percent.replace("%", ""));
          price -= (price * discount) / 100;
        }
      }
    }
    setTotalprice(price);
  }

  const ShowsList = () => {
    return (
      <ul>
        {shows.map((show) => (
          <li
            key={`show-${show.id}`}
            onClick={() => handleShowChange(show.id || 0)}
          >
            {show.movie} - {show.date} - {show.startTime}
          </li>
        ))}
      </ul>
    );
  };
  function handleShowChange(showId: number) {
    setReservationFormData((prevFormData) => ({
      ...prevFormData,
      showId: showId,
    }));
    setChosenShowId(showId);
  }

  const handleReservationFormChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setReservationFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setTicket(value);
    setAmount(reservationFormData.ticketAmount);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const addedOrEdited = reservationFormData.id ? "edited" : "added";
    reservationFormData.timeStamp = new Date();
    const newReservation = await addReservation(reservationFormData);
    alert(`Reservation ${addedOrEdited} successfully!`);
    setReservationFormData({ ...EMPTY_RESERVATION });
    console.info("New/Edited Reservation", newReservation);
  };

  function handleShowsDialogClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowsDialogActive(true);
  }
  function handleCloseDialog(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowsDialogActive(false);
  }

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
        {/* Customer */}
        <h3>Customer</h3>
        <label htmlFor="firstName">Fornavn:</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          onChange={handleReservationFormChange}
        />
        <label htmlFor="lastName">Efternavn:</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          onChange={handleReservationFormChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={handleReservationFormChange}
        />
        <label htmlFor="phoneNumber">Telefon:</label>
        <input
          type="number"
          name="phoneNumber"
          id="phoneNumber"
          onChange={handleReservationFormChange}
        />
        <button className="reservation-form-submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <h3>Total: {totalPrice} kr.</h3>
      {/* Dialog for shows */}
      <dialog id="showsDialog" open={showsDialogActive}>
        <h2>Alle shows!</h2>
        <ShowsList></ShowsList>
        <button onClick={handleCloseDialog}>X</button>
      </dialog>
    </>
  );
}
