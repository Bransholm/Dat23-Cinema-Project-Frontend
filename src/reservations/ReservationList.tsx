// import { useAuth } from "../security/AuthProvider";
import "./ReservationsLayout.css";
import { useEffect, useState } from "react";
import {
  Cinema,
  Reservation,
  getRerservations,
} from "../services/ReservationApiFacade";
import { useNavigate } from "react-router-dom";

export default function ReservationList() {
  // const auth = useAuth();
  const [reservations, setReservations] = useState<Array<Reservation>>([]);
  const [isSortAsc, setIsSortAsc] = useState(true);
  const [cinemaOptions, setCinemaOptions] = useState<Array<string>>([]);
  const [theatreOptions, setTheatreOptions] = useState<Array<string>>([]);
  const [showOptions, setShowOptions] = useState<Array<string>>([]);
  const nav = useNavigate();

  useEffect(() => {
    getRerservations()
      .then((res) => setReservations(res))
      .catch(() => console.log("Error fetching reservations..."));
  }, []);

  useEffect(() => {});

  useEffect(() => {});
  function handleEditReservationClick(reservation: Reservation) {
    nav("/reservations/create", {
      state: { id: reservation.id, isEditReservationClicked: true },
    });
  }

  const reservationTableRows = reservations.map((reservation) => {
    return (
      <tr key={reservation.id}>
        <td>{reservation.show_id}</td>
        <td>{reservation.customer_id}</td>
        <td>{}</td>
        <td>{reservation.ticket}</td>
        <td>{reservation.ticket_amount}</td>
        <td>{reservation.total_price} kr.</td>
        <td>
          <button
            value={`${reservation.id}`}
            onClick={() => handleEditReservationClick(reservation)}
          >
            Redigér
          </button>
        </td>
        <td>
          <button value={`${reservation.id}`} onClick={handleDeleteClick}>
            Slet
          </button>
        </td>
      </tr>
    );
  });

  function handleSortChange(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const column = e.currentTarget.value as keyof Reservation;
    const sorting = isSortAsc ? 1 : -1;
    let sortedReservations: Array<Reservation> = [];
    sortedReservations = [...reservations].sort((a, b) => {
      if (a[column]! < b[column]!) return -sorting;
      if (a[column]! > b[column]!) return sorting;
      return 0;
    });

    setReservations(sortedReservations);
    setIsSortAsc(!isSortAsc);
  }

  function handleDeleteClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const reservationsAfterDeletion: Array<Reservation> = [];
    for (let i = 0; i < reservations.length; i++) {
      if (
        reservations[i] != undefined &&
        reservations[i].id != Number(e.currentTarget.value)
      ) {
        reservationsAfterDeletion[i] = reservations[i];
      }
    }
    setReservations(reservationsAfterDeletion);
  }

  //  function handleFilterChange(){}

  return (
    <>
      <div id="filter-section">
        <h4>Filtrér:</h4>
        <select name="cinema-select" id="cinema-select"></select>
        <select name="theatre-select" id="theatre-select"></select>
        <select name="show-select" id="show-select"></select>
      </div>
      <table id="reservations-table">
        <thead>
          <tr>
            <th>
              <button value="show_id" onClick={handleSortChange}>
                Forestilling
              </button>
            </th>
            <th>
              <button value="customer_id" onClick={handleSortChange}>
                Kunde
              </button>
            </th>
            <th>
              <button value="time_stamp" onClick={handleSortChange}>
                Oprettelsesdato
              </button>
            </th>
            <th>
              <button value="ticket" onClick={handleSortChange}>
                Billet
              </button>
            </th>
            <th>
              <button value="ticket_amount" onClick={handleSortChange}>
                Billet antal
              </button>
            </th>
            <th>
              <button value="total_price" onClick={handleSortChange}>
                Totale pris
              </button>
            </th>
          </tr>
        </thead>
        <tbody>{reservationTableRows}</tbody>
      </table>
    </>
  );
}
