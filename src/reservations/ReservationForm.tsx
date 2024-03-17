import { useEffect, useState } from "react";
import {
  Show,
  Reservation,
  getShows,
  addReservation,
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
  ticket: "", //Skal laves i backenden!!
};

export default function ReservationForm() {
  const [reservationFormData, setReservationFormData] =
    useState<Reservation>(EMPTY_RESERVATION);
  const [shows, setShows] = useState<Show[]>([]);
  const [chosenShowId, setChosenShowId] = useState(0);
  const [showsDialogActive, setShowsDialogActive] = useState(false);

  useEffect(() => {
    getShows().then((res) => setShows(res));
  }, []);

  function handleShowChange(showId: number) {
    setReservationFormData((prevFormData) => ({
      ...prevFormData,
      showId: showId,
    }));
    setChosenShowId(showId);
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

  const handleReservationFormChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setReservationFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
        <input
          type="radio"
          name="ticket"
          id="cowboy_ticket"
          value="cowboy_ticket"
        />
        <label htmlFor="cowboy_ticket">Cowboy-billet</label>
        <input
          type="radio"
          name="ticket"
          id="sofa_ticket"
          value="sofa_ticket"
        />
        <label htmlFor="sofa_ticket">Sofa-billet</label>
        <input
          type="radio"
          name="ticket"
          id="standard_ticket"
          value="standard_ticket"
        />
        <label htmlFor="standard_ticket">Standard-billet</label>
        {/* Amount */}
        <label htmlFor="ticketAmount"></label>
        <input type="number" name="ticketAmount" id="ticketAmount" />
        {/* Customer */}
        <h3>Customer</h3>
        <label htmlFor="firstName">First Name: </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          onChange={handleReservationFormChange}
        />
        <label htmlFor="lastName">Last Name: </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          onChange={handleReservationFormChange}
        />
        <label htmlFor="lastName">Last Name: </label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={handleReservationFormChange}
        />
        <label htmlFor="phoneNumber">Last Name: </label>
        <input
          type="number"
          name="phoneNumber"
          id="phoneNumber"
          onChange={handleReservationFormChange}
        />
        <button className="reservation-form-submit-btn" onClick={handleSubmit}>
          Submit
        </button>

        {/* Dialog for shows */}
        {showsDialogActive && (
          <dialog id="showsDialog">
            <h2>Alle shows!</h2>
            <ShowsList></ShowsList>
            <button onClick={handleCloseDialog}>X</button>
          </dialog>
        )}
      </form>
    </>
  );
}
