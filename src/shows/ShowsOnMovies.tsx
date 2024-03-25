import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShows, ShowInterfaceTheatre } from "../services/showAPI";
import { getMovie, movie as movieInterface } from "../services/movieApi";

export default function ShowsOnMovies() {
  const { id } = useParams();

  const [shows, setShows] = useState<ShowInterfaceTheatre[]>([]);
  const [error, setError] = useState("");
  const [movie, setMovie] = useState<movieInterface | null>(null);

  useEffect(() => {
    getShows()
      .then((res) => {
        console.log("Shows:", res);
        setShows(res as ShowInterfaceTheatre[]);
      })
      .catch((error) => {
        console.error("Error fetching shows:", error);
        setError("Shows not fetched");
      });
  }, []);

  useEffect(() => {
    getMovie(Number(id))
      .then((res) => {
        console.log("Movie:", res);
        setMovie(res as movieInterface);
      })
      .catch((error) => {
        console.error("Error fetching movie:", error);
        setError("Movie not fetched");
      });
  }, [id]);

  if (error !== "") {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  return (
    <>
      {movie && movie.active ? (
        <>
          <div>
            <h2>{movie.title}</h2>
            <div>
              <strong>Movie ID:</strong> {movie.id} <br />
              <strong>Title:</strong> {movie.title} <br />
              <strong>Description:</strong> {movie.description} <br />
              <strong>Actors:</strong> {movie.actors} <br />
              <strong>Duration:</strong> {movie.duration} minutes <br />
              <strong>Genre:</strong> {movie.genre} <br />
              <strong>3D:</strong> {movie.threeD ? "YES" : "NO"} <br />
              <strong>Active:</strong> {movie.active ? "YES" : "NO"} <br />
            </div>
          </div>
          <h2>Shows</h2>
          <ul>
            {shows
              .filter((show) => show.movie.id === Number(id))
              .map((show) => (
                <li key={show.id}>
                  <h3>{show.date}</h3>
                  <div>
                    <strong>Show ID:</strong> {show.id} <br />
                    <strong>Date:</strong> {show.date} <br />
                    <strong>Start Time:</strong> {show.startTime} <br />
                    <strong>Theatre ID:</strong> {show.theatre.id} <br />
                    {show.movie && (
                      <>
                        <strong>Movie ID:</strong> {show.movie.id} <br />
                        <strong>Movie Title:</strong> {show.movie.title} <br />
                        <strong>Movie Duration:</strong> {show.movie.duration}{" "}
                        minutes <br />
                      </>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </>
      ) : (
        <h2>Sorry, movie not found or inactive</h2>
      )}
    </>
  );
}

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getShows, ShowInterfaceTheatre } from "../services/showAPI";
// import { getMovie, movie as movieInterface } from "../services/movieAPItest";

// export default function ShowsOnMovies() {
//   const { id } = useParams();

//   const [shows, setShows] = useState<ShowInterfaceTheatre[]>([]);
//   const [error, setError] = useState("");
//   const [movie, setMovie] = useState<movieInterface | null>(null);

//   useEffect(() => {
//     getShows()
//       .then((res) => setShows(res as ShowInterfaceTheatre[]))
//       .catch(() => setError("Shows not fetched"));
//   }, []);

//   useEffect(() => {
//     getMovie(Number(id))
//       .then((res) => setMovie(res as movieInterface))
//       .catch(() => setError("Movie not fetched"));
//   }, [id]);

//   if (error !== "") {
//     return <h2 style={{ color: "red" }}>{error}</h2>;
//   }

//   return (
//     <>
//       {movie && movie.isActive ? (
//         <>
//           <div>
//             <h2>{movie.title}</h2>
//             <div>
//               <strong>Movie ID:</strong> {movie.id} <br />
//               <strong>Title:</strong> {movie.title} <br />
//               <strong>Description:</strong> {movie.description} <br />
//               <strong>Actors:</strong> {movie.actors} <br />
//               <strong>Duration:</strong> {movie.duration} minutes <br />
//               <strong>Genre:</strong> {movie.genre} <br />
//               <strong>3D:</strong> {movie.threed ? "Yes" : "No"} <br />
//               <strong>Active:</strong> {movie.isActive ? "Yes" : "No"} <br />
//             </div>
//           </div>
//           <h2>Shows</h2>
//           <ul>
//             {shows
//               .filter((show) => show.movie.id === Number(id))
//               .map((show) => (
//                 <li key={show.id}>
//                   <h3>{show.date}</h3>
//                   <div>
//                     <strong>Show ID:</strong> {show.id} <br />
//                     <strong>Date:</strong> {show.date} <br />
//                     <strong>Start Time:</strong> {show.startTime} <br />
//                     <strong>Theatre ID:</strong> {show.theatre.id} <br />
//                     <strong>Movie ID:</strong> {show.movie.id} <br />
//                     <strong>Movie Title:</strong> {show.movie.title} <br />
//                     <strong>Movie Duration:</strong> {show.movie.duration} minutes <br />
//                   </div>
//                 </li>
//               ))}
//           </ul>
//         </>
//       ) : (
//         <h2>Sorry, movie not found or inactive</h2>
//       )}
//     </>
//   );
// }
