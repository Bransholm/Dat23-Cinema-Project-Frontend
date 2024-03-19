import { Link } from "react-router-dom";
import ReservationList from "./ReservationList";

export default function ReservationsLayout() {
  return (
    <div>
      <h2>Reservations!</h2>
      <Link to="/reservations/create">
        <button>Create Reservation</button>
      </Link>
      <ReservationList />
    </div>
  );
}
