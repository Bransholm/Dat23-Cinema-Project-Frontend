// const endpoint = "http://localhost:8080";

import { Movie } from "../MoviesData";

export default function MoviePostRoute(createdMovie: Movie): Promise<Movie> {
  console.log("post-route-data", createdMovie);
  return fetch(`http://localhost:8080/movies`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(createdMovie),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("An error occured while updating the movie");
    }
    return response.json() as Promise<Movie>;
  });
}
