import { API_URL } from "../settings";
import { handleHttpErrors, makeOptions } from "./fetchUtils";
const RESERVATION_URL = API_URL + "/reservations";

interface Reservation {
  id: number | null;
  show_id: number | null;
  customer_id: number | null;
  total_price: number;
  time_stamp: Date | null;
  ticket: string;
  ticket_amount: number;
}
interface Customer {
  id: number | null;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}
interface Show {
  id: number | null;
  theatre: string;
  movie: string;
  date: string;
  start_time: string;
}
interface Price {
  id: number | null;
  name: string;
  price: number;
  percent: number;
}

async function getRerservations(): Promise<Array<Reservation>> {
  return fetch(RESERVATION_URL).then(handleHttpErrors);
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
    { id: 1, theatre: "th1", movie: "mv1", date: "date1", start_time: "time1" },
    { id: 2, theatre: "th2", movie: "mv2", date: "date2", start_time: "time2" },
    { id: 3, theatre: "th3", movie: "mv3", date: "date3", start_time: "time3" },
    { id: 4, theatre: "th4", movie: "mv4", date: "date4", start_time: "time4" },
  ];
}

async function getCustomers() {
  return [
    {
      id: 1,
      first_name: "fn1",
      last_name: "en1",
      email: "email1",
      phone_number: "123456789",
    },
    {
      id: 2,
      first_name: "fn2",
      last_name: "en2",
      email: "email2",
      phone_number: "987654321",
    },
    {
      id: 3,
      first_name: "fn3",
      last_name: "en3",
      email: "email3",
      phone_number: "234567890",
    },
    {
      id: 4,
      first_name: "fn4",
      last_name: "en4",
      email: "email4",
      phone_number: "098765432",
    },
  ];
}

async function getPrices() {
  return [
    { id: 1, name: "standard_ticket", price: 80, percent: 0 },
    { id: 2, name: "cowboy_ticket", price: 100, percent: 0 },
    { id: 3, name: "sofa_ticket", price: 120, percent: 0 },
    { id: 4, name: "group_discount", price: 0, percent: 7 },
    { id: 5, name: "reservation_fee", price: 30, percent: 0 },
  ];
}

export type { Reservation, Customer, Show, Price };
// eslint-disable-next-line react-refresh/only-export-components
export { addReservation, getShows, getPrices, getCustomers, getRerservations };
