import { API_URL } from "../settings";
import { handleHttpErrors } from "./fetchUtils";
import { theatre } from "./theatreApiFacade";
const SEATS_URL = API_URL + "/seats";

interface Seat {
  id: number | null;
  theatre: theatre;
  lineNumber: number;
  seatNumber: number;
}

async function getSeats() {
  return fetch(SEATS_URL).then(handleHttpErrors);
}

export type { Seat };
export { getSeats };
