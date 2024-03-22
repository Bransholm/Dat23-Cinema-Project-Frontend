import { getMovies, movie as MovieInterface } from "../services/movieAPItest";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getShows } from "../services/showAPI";

export default function MovieList() {
  const [movies, setMovies] = useState<MovieInterface[]>([]);
  const [error, setError] = useState("");
  //   const [shows, setShows] = useState([]);
  const [shows, setShows] = useState<{ movie: { id: number } }[]>([]);

  useEffect(() => {
    getMovies()
      .then((res) => setMovies(res as MovieInterface[]))
      .catch(() => setError("Movies not fetched"));

    getShows()
      .then((res) => setShows(res as []))
      .catch(() => setError("Shows not fetched"));
  }, []);

  if (error !== "") {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  // Filter out inactive movies
  const activeMovies = movies.filter((movie) => movie.active);

  // Filter out movies that have corresponding shows
  const moviesWithShows = activeMovies.filter((movie) => shows.some((show) => show.movie.id === movie.id));

  const movieListItems = moviesWithShows.map((movie) => (
    <li key={movie.id} className="show-list-item">
      <Link to={`/showonmovie/${movie.id}`}>
        Movie ID: {movie.id}
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
        <p>Actors: {movie.actors}</p>
        <p>Duration: {movie.duration} minutes</p>
        <p>Genre: {movie.genre}</p>
        <p>3D: {movie.threeD ? "Yes" : "No"}</p>
        <p>Active: {movie.active ? "Yes" : "No"}</p>
      </Link>
    </li>
  ));

  return (
    <>
      <h2>Active Movies with Shows</h2>
      <ul>{movieListItems}</ul>
    </>
  );
}

// import { getMovies, movie as MovieInterface } from "../services/movieAPItest";
// import { useEffect, useState } from "react";
// import "../shows/showStyle.css";
// import { Link } from "react-router-dom";

// export default function MovieList() {
//   const [movies, setMovies] = useState<MovieInterface[]>([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     getMovies()
//       .then((res) => setMovies(res as MovieInterface[]))
//       .catch(() => setError("Movies not fetched"));
//   }, []);

//   if (error !== "") {
//     return <h2 style={{ color: "red" }}>{error}</h2>;
//   }

//   const movieListItems = movies.map((movie) => (
//     <li key={movie.id} className="show-list-item">
//       <Link to={`/showonmovie/${movie.id}`}>
//         Movie ID: {movie.id}
//         <h3>{movie.title}</h3>
//         <p>{movie.description}</p>
//         <p>Actors: {movie.actors}</p>
//         <p>Duration: {movie.duration} minutes</p>
//         <p>Genre: {movie.genre}</p>
//         <p>3D: {movie.threeD ? "Yes" : "No"}</p>
//         <p>Active: {movie.active ? "Yes" : "No"}</p>
//       </Link>
//     </li>
//   ));

//   return (
//     <>
//       <h2>Movies</h2>
//       <ul>{movieListItems}</ul>
//     </>
//   );
// }
