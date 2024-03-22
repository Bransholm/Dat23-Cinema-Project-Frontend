// import { API_URL } from "../settings";
// import { handleHttpErrors } from "./fetchUtils";
// const PRICES_URL = API_URL + "/prices";

interface Price {
  id: number | null;
  ticket_cheap: number;
  ticket_medium: number;
  ticket_expensive: number;
  fee_expedition: number;
  fee_3d: number;
  fee_long_duration: number;
  discount_group: number;
  [key: string]: number | null;
}

async function getPrices() {
  // return fetch(PRICES_URL).then(handleHttpErrors);
  return {
    id: null,
    ticket_cheap: 80,
    ticket_medium: 100,
    ticket_expensive: 120,
    fee_expedition: 30,
    fee_3d: 40,
    fee_long_duration: 20,
    discount_group: 7,
  };
}

export type { Price };
export { getPrices };
