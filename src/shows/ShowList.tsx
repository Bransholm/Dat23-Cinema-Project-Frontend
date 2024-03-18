// import {useParams } from "react-router-dom";
import { getShows, Show } from "../services/showAPI";
import { useEffect, useState } from "react";

export default function ShowList() {
  // const { id } = useParams();
  // console.log("id", id);

  const [shows, setShow] = useState<Array<Show>>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getShows()
      .then((res) => setShow(res))
      .catch(() => setError("Show not fetched"));
  }, []);

//   const showListItems = shows.map((show) => {
//     return (
//       <li key={show.id}>
//         {show.id} {show.date} {show.startTime} {show.theatre.id} {show.movie.id} {show.movie.title} {show.movie.duration}
//       </li>
//     );
//   });

const showListItems = shows.map((show) => {
  return (
    <>
     <li key={show.id}>
      <strong>Show ID:</strong> {show.id} <br />
      <strong>Date:</strong> {show.date} <br />
      <strong>Start Time:</strong> {show.startTime} <br />
      <strong>Theatre ID:</strong> {show.theatre.id} <br />
      <strong>Movie ID:</strong> {show.movie.id} <br />
      <strong>Movie Title:</strong> {show.movie.title} <br />
      <strong>Movie Duration:</strong> {show.movie.duration} minutes <br />
    </li>
     <br>
    </br>
   </>
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
        <h2>Sorry. Show's not found</h2>
      )}
    </>
  );
}
