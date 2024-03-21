import { Movie } from "../MoviesData";

const endpoint = "http://localhost:8080";

export default async function getMovies(): Promise<Movie[]> {
  return fetch(`${endpoint}/movies`).then((response) => {
    if (!response.ok) {
      throw new Error("Error while fethcing - movies");
    }
    return response.json() as Promise<Movie[]>;
  });
}
