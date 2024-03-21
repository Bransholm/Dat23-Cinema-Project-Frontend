import { API_URL } from "../settings";
import { handleHttpErrors } from "./fetchUtils";
const PRICES_URL = API_URL + "/prices";

interface Prices {
  //CHANGE
  id: number | null;
  ticketCheap: number;
  ticketMedium: number;
  ticketExpensive: number;
  feeExpedition: number;
  fee3D: number;
  feeLongDuration: number;
  discountGroup: number;
}

async function getPrices() {
  return fetch(PRICES_URL).then(handleHttpErrors);
}

export type { Prices };
export { getPrices };
