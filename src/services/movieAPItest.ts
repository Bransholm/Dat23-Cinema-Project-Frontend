import { handleHttpErrors } from "./fetchUtils";
import { API_URL } from "../settings";

const MOVIE_URL = API_URL + "/movies";

interface movie {
  id: number ;
  title: string;
  description: string;
  actors: string;
  duration: number;
  genre: string;
  threeD: boolean;
  active: boolean;
}

async function getMovies(): Promise<Array<movie>> {
    console.log("fetchMovies");
    
  return fetch(MOVIE_URL).then(handleHttpErrors);
}

// test that i get all the movies
getMovies().then(res => console.log(res))

async function getMovie(id: number): Promise<movie> {
  return fetch(MOVIE_URL + "/" + id).then(handleHttpErrors);
}

export type { movie };

export { getMovies, getMovie };