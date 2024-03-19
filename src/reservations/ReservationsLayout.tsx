import ReservationList from "./ReservationList";

export default function ReservationsLayout() {
  return (
    <div>
      <h2>Reservations!</h2>
      <button>Create Reservation</button>
      <ReservationList />
    </div>
  );
}
