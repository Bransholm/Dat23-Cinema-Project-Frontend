import { API_URL } from "../settings";
import { handleHttpErrors } from "./fetchUtils";

const SHOWS_URL = API_URL + "/shows";

interface Show {
  id: number | null;
  theatre: {
    id: number;
  };
  movie: {
    id: number;
  };
  date: string;
  startTime: string;
}


// let shows: Array<Show> = [];

async function getShows(): Promise<Array<Show>> {
  console.log("fetchShows");
  // Fetch data from the API URL and handle any HTTP errors.
  return fetch(SHOWS_URL).then(handleHttpErrors);
}

export type { Show };

// Export the getShows function to use it in other modules.
export { getShows };
