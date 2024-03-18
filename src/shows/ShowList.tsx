import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getShows, show as showInterface } from "../services/showAPI";
import "./showStyle.css"; 



export default function ShowList() {
  const [shows, setShow] = useState<Array<showInterface>>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getShows()
      .then((res) => setShow(res))
      .catch(() => setError("Show not fetched"));
  }, []);

  const showListItems = shows.map((show) => {
    return (
      <li key={show.id} className="show-list-item">
        {" "}
        {/* Add show-list-item class here */}
        <Link to={`/shows/${show.id}`}>
          <strong>Show ID:</strong> {show.id} <br />
          <strong>Date:</strong> {show.date} <br />
          <strong>Start Time:</strong> {show.startTime} <br />
          <strong>Theatre ID:</strong> {show.theatre.id} <br />
          <strong>Movie ID:</strong> {show.movie.id} <br />
          <strong>Movie Title:</strong> {show.movie.title} <br />
          <strong>Movie Duration:</strong> {show.movie.duration} minutes <br />
        </Link>
      </li>
    );
  });

  if (error !== "") {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  return (
    <>
      <h2>Shows</h2>
      {shows.length > 0 ? (
        <div>
          <ul>{showListItems}</ul>
        </div>
      ) : (
        <h2>Sorry. Shows are not found</h2>
      )}
    </>
  );
}

// // import {useParams } from "react-router-dom";
// import { getShows, show as showInterface } from "../services/showAPI";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function ShowList() {

//   const [shows, setShow] = useState<Array<showInterface>>([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     getShows()
//       .then((res) => setShow(res))
//       .catch(() => setError("Show not fetched"));
//   }, []);

//   const showListItems = shows.map((show) => {
//     return (
//       <>
//         <li key={show.id}>
//           <Link to={`/shows/${show.id}`}>
//             <strong>Show ID:</strong> {show.id} <br />
//             <strong>Date:</strong> {show.date} <br />
//             <strong>Start Time:</strong> {show.startTime} <br />
//             <strong>Theatre ID:</strong> {show.theatre.id} <br />
//             <strong>Movie ID:</strong> {show.movie.id} <br />
//             <strong>Movie Title:</strong> {show.movie.title} <br />
//             <strong>Movie Duration:</strong> {show.movie.duration} minutes <br />
//           </Link>
//         </li>
//         <br></br>
//       </>
//     );
//   });

//   if (error !== "") {
//     return <h2 style={{ color: "red" }}>{error}</h2>;
//   }

//   return (
//     <>
//       <h2>Shows</h2>
//       {shows.length > 0 ? (
//         <div>
//           <ul>{showListItems}</ul>
//         </div>
//       ) : (
//         <h2>Sorry. Shows are not found</h2>
//       )}
//     </>
//   );
// }
