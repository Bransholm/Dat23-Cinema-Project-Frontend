import { API_URL } from "../settings";
import { handleHttpErrors } from "./fetchUtils";
const CUSTOMER_URL = API_URL + "/customers";

interface Customer {
  id: number | null;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

async function getCustomers() {
  return fetch(CUSTOMER_URL).then(handleHttpErrors);
}

export type { Customer };
export { getCustomers };
