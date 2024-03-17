import { API_URL } from "../settings";
import { handleHttpErrors, makeOptions } from "./fetchUtils";
const RESERVATION_URL = API_URL + "/reservations";

interface Reservation {
  id: number | null;
  showId: number | null;
  customer: {
    id: number | null;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
  };
  totalPrice: number;
  timeStamp: Date | null;
  ticket: string;
}
interface Customer {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
}
interface Show {
  id: number | null;
  theatre: string;
  movie: string;
  date: string;
  startTime: string;
}

async function addReservation(
  newReservation: Reservation
): Promise<Reservation> {
  const method = newReservation.id ? "PUT" : "POST";
  const options = makeOptions(method, newReservation);
  const URL = newReservation.id
    ? `${RESERVATION_URL}/${newReservation.id}`
    : RESERVATION_URL;
  return fetch(URL, options).then(handleHttpErrors);
}

async function getShows() {
  return [
    { id: 1, theatre: "th1", movie: "mv1", date: "date1", startTime: "time1" },
    { id: 2, theatre: "th2", movie: "mv2", date: "date2", startTime: "time2" },
    { id: 3, theatre: "th3", movie: "mv3", date: "date3", startTime: "time3" },
    { id: 4, theatre: "th4", movie: "mv4", date: "date4", startTime: "time4" },
  ];
}

export type { Reservation, Customer, Show };
// eslint-disable-next-line react-refresh/only-export-components
export { addReservation, getShows };
