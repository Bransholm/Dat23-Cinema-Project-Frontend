import { Link } from "react-router-dom";
import ReservationList from "./ReservationList";
import "./ReservationsLayout.css";

export default function ReservationsLayout() {
  return (
    <div id="reservations-page">
      <h2>Reservations!</h2>
      <Link to="/reservations/create">
        <button id="create-reservation-btn">Create Reservation</button>
      </Link>
      <br />
      <ReservationList />
    </div>
  );
}
