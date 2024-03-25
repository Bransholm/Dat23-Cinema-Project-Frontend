import { API_URL } from "../settings";
import { handleHttpErrors, makeOptions } from "./fetchUtils";
import {
  getMovies,
  movie,
  movie as movieInterface,
} from "../services/movieApi";
import {
  getTheatres,
  theatre,
  theatre as theatreInterface,
} from "./theatreApiFacade";

const SHOWS_URL = API_URL + "/shows";

interface show {
  id: number | null;
  theatre: theatre;
  movie: movie;
  date: string;
  startTime: string;
}

interface showInterface {
  id: number | null;
  theatre: {
    id: number;
  };
  movie: {
    id: number;
    title: string;
    duration: number;
  };
  date: string;
  startTime: string;
}

interface ShowInterfaceTheatre {
  id: number | null;
  theatre: {
    id: number;
    name: string;
  };
  movie: {
    id: number;
    title: string | undefined;
    duration: number;
  };
  date: string;
  startTime: string;
}

// let showList: Array<Show> = [];

let movies: Array<movieInterface> = [];
let theatres: Array<theatreInterface> = [];

async function movieData() {
  const res = await getMovies();
  movies = [...res];
  return movies;
}

async function theatreData() {
  const res = await getTheatres();
  theatres = [...res];
  return theatres;
}

async function getShows(): Promise<
  Array<show | showInterface | ShowInterfaceTheatre>
> {
  console.log("fetchShows");
  // Fetch data from the API URL and handle any HTTP errors.
  return fetch(SHOWS_URL).then(handleHttpErrors);
}

async function getShow(id: number): Promise<show | showInterface> {
  // if (ShowList.length > 0) return [...showList];
  return fetch(SHOWS_URL + "/" + id).then(handleHttpErrors);
}

async function addShow(show: show): Promise<show> {
  const method = show.id ? "PUT" : "POST";
  const options = makeOptions(method, show);
  const URL = show.id ? SHOWS_URL + "/" + show.id : SHOWS_URL;
  return fetch(URL, options).then(handleHttpErrors);
}

async function deleteShow(id: number): Promise<show> {
  const options = makeOptions("DELETE", null);
  return fetch(SHOWS_URL + "/" + id, options).then(handleHttpErrors);
}

export type { show, showInterface, ShowInterfaceTheatre };

// Export the getShows function to use it in other modules.
export { getShows, getShow, addShow, deleteShow, movieData, theatreData };
