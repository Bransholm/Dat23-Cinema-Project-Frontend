const endpoint = "http://localhost:8080";

import { Movie } from "../MoviesData";

export default function MoviePutRoute(
  movieId: number,
  updatedMovie: Movie
): Promise<Movie> {
  console.log("put-route-data", updatedMovie);
  return fetch(`${endpoint}/movies/${movieId}`, {
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
    return response.json() as Promise<Movie>;
  });
}
