const enpoint = "http://localhost:8800/";

interface Movie {
  id: number;
  title: string;
  duration: number;
  is3D: boolean;
  isActive: boolean;
}

export default function MoviePutRoute(
  movieId: number,
  updatedMovie: Movie
): Promise<Movie> {
  console.log("put-route-data", movieId, updatedMovie);
  return fetch(enpoint + `${movieId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(updatedMovie),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("An error occured while updating the movie");
    }
    return response.json() as Promise<Movie>;
  });
}
