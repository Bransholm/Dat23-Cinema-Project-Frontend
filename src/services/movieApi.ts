import { handleHttpErrors } from "./fetchUtils";
import { API_URL } from "../settings";

const MOVIE_URL = API_URL + "/movies";

interface Movie {
  id: number;
  title: string;
  description: string;
  actors: string;
  duration: number;
  genre: string;
  threeD: boolean;
  isActive: boolean;
}

async function getMovies(): Promise<Array<Movie>> {
  console.log("fetchMovies");
  return fetch(MOVIE_URL).then(handleHttpErrors);
}

async function getMovie(id: number): Promise<Movie> {
  return fetch(MOVIE_URL + "/" + id).then(handleHttpErrors);
}

export type { Movie };

export { getMovies, getMovie };
