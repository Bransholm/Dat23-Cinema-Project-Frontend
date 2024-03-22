import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovie, movie as movieInterface } from "../services/movieAPItest";

export default function Movie() {
const { id } = useParams();

const [movies, setMovies] = useState<movieInterface | null>(null);
const [error, setError] = useState("");

useEffect(() => {
  getMovie(Number(id))
    .then((res) => setMovies(res as movieInterface))
    .catch(() => setError("Movie not fetched"));
}, [id]);

 if (error !== "") {
   return <h2 style={{ color: "red" }}>{error}</h2>;
 }

    return (
    <>
        {movies ? (
        <>
            <h2>{movies?.title}</h2>
            <div>
            <strong>Movie ID:</strong> {movies.id} <br />
            <strong>Title:</strong> {movies.title} <br />
            <strong>Description:</strong> {movies.description} <br />
            <strong>Actors:</strong> {movies.actors} <br />
            <strong>Duration:</strong> {movies.duration} minutes <br />
            <strong>Genre:</strong> {movies.genre} <br />
            <strong>3D:</strong> {movies.threeD ? "Yes" : "No"} <br />
            <strong>Active:</strong> {movies.active ? "Yes" : "No"} <br />
            </div>
        </>
        ) : (
        <h2>Sorry. Movie's not found</h2>
        )}
    </>
    );

}