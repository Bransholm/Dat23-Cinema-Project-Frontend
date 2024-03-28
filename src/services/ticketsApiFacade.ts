import { API_URL } from "../settings";
import { handleHttpErrors, makeOptions } from "./fetchUtils";
import { Seat } from "./seatsApiFacade";
const TICKETS_URL = API_URL + "/tickets";

interface Ticket {
  id: number | null;
  reservation: Ticket;
  seat: Seat;
  ticketType: string;
  ticketPrice: number;
}

async function addTicket(newTicket: Ticket): Promise<Ticket> {
  const method = newTicket.id ? "PUT" : "POST";
  const options = makeOptions(method, newTicket);
  const URL = newTicket.id ? `${TICKETS_URL}/${newTicket.id}` : TICKETS_URL;
  return fetch(URL, options).then(handleHttpErrors);
}

export type { Ticket };
export { addTicket };
