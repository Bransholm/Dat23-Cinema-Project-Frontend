import { handleHttpErrors } from "./fetchUtils";
import { API_URL } from "../settings";

const MOVIE_URL = API_URL + "/movie";

interface movie {
  id: number ;
  title: string;
  duration: number;

}

async function getMovies(): Promise<Array<movie>> {
    console.log("fetchMovies");
    
  return fetch(MOVIE_URL).then(handleHttpErrors);
}

async function getMovie(id: number): Promise<movie> {
  return fetch(MOVIE_URL + "/" + id).then(handleHttpErrors);
}

export type { movie };

export { getMovies, getMovie };