// import { useAuth } from "../security/AuthProvider";

import { useEffect, useState } from "react";
import {
  Reservation,
  getRerservations,
} from "../services/ReservationApiFacade";

export default function ReservationList() {
  // const auth = useAuth();
  const [reservations, setReservations] = useState<Array<Reservation>>([]);
  const [isSortAsc, setIsSortAsc] = useState(true);

  useEffect(() => {
    getRerservations()
      .then((res) => setReservations(res))
      .catch(() => console.log("Error fetching reservations..."));
  }, []);

  const reservationTableRows = reservations.map((reservation) => {
    return (
      <tr key={reservation.id}>
        <td>{reservation.show_id}</td>
        <td>{reservation.customer_id}</td>
        <td>{}</td>
        <td>{reservation.ticket}</td>
        <td>{reservation.ticket_amount}</td>
        <td>{reservation.total_price}</td>
        <td>
          <button>Redigér</button>
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

  //   function handleEditClick(){}

  //  function handleFilterChange(){}

  return (
    <table>
      <thead>
        <tr>
          <th>
            <button value="show_id" onClick={handleSortChange}>
              Show
            </button>
          </th>
          <th>
            <button value="customer_id" onClick={handleSortChange}>
              Customer
            </button>
          </th>
          <th>
            <button value="time_stamp" onClick={handleSortChange}>
              Time of Creation
            </button>
          </th>
          <th>
            <button value="ticket" onClick={handleSortChange}>
              Ticket
            </button>
          </th>
          <th>
            <button value="ticket_amount" onClick={handleSortChange}>
              Ticket Amount
            </button>
          </th>
          <th>
            <button value="total_price" onClick={handleSortChange}>
              Total Price
            </button>
          </th>
        </tr>
      </thead>
      <tbody>{reservationTableRows}</tbody>
    </table>
  );
}
