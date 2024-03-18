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
  ticketAmount: number;
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
interface Price {
  id: number | null;
  name: string;
  price: number;
  percent: string;
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

async function getPrices() {
  return [
    { id: 1, name: "standard_ticket", price: 80, percent: "" },
    { id: 2, name: "cowboy_ticket", price: 100, percent: "" },
    { id: 3, name: "sofa_ticket", price: 120, percent: "" },
    { id: 4, name: "group_discount", price: 0, percent: "7" },
    { id: 5, name: "reservation_fee", price: 30, percent: "" },
  ];
}

export type { Reservation, Customer, Show, Price };
// eslint-disable-next-line react-refresh/only-export-components
export { addReservation, getShows, getPrices as getTickets };
