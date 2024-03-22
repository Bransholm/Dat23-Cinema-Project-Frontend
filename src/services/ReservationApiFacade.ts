import { API_URL } from "../settings";
import { handleHttpErrors, makeOptions } from "./fetchUtils";
const RESERVATION_URL = API_URL + "/reservations";

interface Reservation {
  id: number | null;
  show_id: number;
  customer_id: number;
  total_price: number;
  time_stamp: Date | null;
  ticket: string;
  ticket_amount: number;
}

async function getRerservations(): Promise<Array<Reservation>> {
  return fetch(RESERVATION_URL).then(handleHttpErrors);
}

async function getReservation(id: number): Promise<Reservation> {
  return fetch(RESERVATION_URL + "/" + id).then(handleHttpErrors);
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

function getCinemas() {
  return [{ id: 1, city: "123 Example St, Cityville", name: "Cinema City" }];
}

function getTheatres() {
  return [{ id: 1, name: "Theatre 1" }];
}

export type { Reservation };
// eslint-disable-next-line react-refresh/only-export-components
export {
  addReservation,
  getRerservations,
  getReservation,
  getCinemas,
  getTheatres,
};
