import { handleHttpErrors } from "./fetchUtils";
import { API_URL } from "../settings";
// import { Movie } from "../adminsite/MoviesData";

const MOVIE_URL = API_URL + "/movies";

interface movie {
  id: number;
  title: string;
  description: string;
  actors: string;
  duration: number;
  genre: string;
  threeD: boolean;
  active: boolean;
}

interface movieDefault {
  id?: number;
  title: string;
  description: string;
  actors: string;
  duration: number;
  genre: string;
  threeD: boolean;
  active: boolean;
}

function MoviePutRoute(updatedMovie: movieDefault | movie): Promise<movie> {
  console.log("put-route-data", updatedMovie);
  return fetch(`${MOVIE_URL}/${updatedMovie.id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(updatedMovie),
  }).then((response) => {
    console.log("put-route-response", response); // Log the response here
    if (!response.ok) {
      throw new Error("An error occured while updating the movie");
    }
    return response.json() as Promise<movie>;
  });
}

function MoviePostRoute(createdMovie: movieDefault | movie): Promise<movie> {
  console.log("post-route-data", createdMovie);
  return fetch(`${MOVIE_URL}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(createdMovie),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("An error occured while updating the movie");
    }
    return response.json() as Promise<movie>;
  });
}

async function getMovies(): Promise<Array<movie>> {
  console.log("fetchMovies");

  return fetch(MOVIE_URL).then(handleHttpErrors);
}

// test that i get all the movies
getMovies().then((res) => console.log(res));

async function getMovie(id: number): Promise<movie> {
  return fetch(MOVIE_URL + "/" + id).then(handleHttpErrors);
}

export type { movie, movieDefault };

export { getMovies, getMovie, MoviePutRoute, MoviePostRoute };
