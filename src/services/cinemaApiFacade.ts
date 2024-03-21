import { handleHttpErrors } from "./fetchUtils";
import { API_URL } from "../settings";
const CINEMA_URL = API_URL + "/cinema";

interface Cinema {
  id: number | null;
  city: string;
  name: string;
}

async function getCinemas() {
  return fetch(CINEMA_URL).then(handleHttpErrors);
}

export type { Cinema };
export { getCinemas };
