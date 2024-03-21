

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getShow,  showInterface } from "../services/showAPI";

export default function Show() {
  const { id } = useParams();
//   console.log("id", id); 

  const [show, setShow] = useState<showInterface| null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getShow(Number(id))
      .then((res) => setShow(res as showInterface))
      .catch(() => setError("Show not fetched"));
  }, [id]);

  if (error !== "") {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  return (
    <>
      {show ? (
        <>
          <h2>{show?.movie.title}: {show.date}</h2>
          <div>
            <strong>Show ID:</strong> {show.id} <br />
            <strong>Date:</strong> {show.date} <br />
            <strong>Start Time:</strong> {show.startTime} <br />
            <strong>Theatre ID:</strong> {show.theatre.id} <br />
            <strong>Movie ID:</strong> {show.movie.id} <br />
            <strong>Movie Title:</strong> {show.movie.title} <br />
            <strong>Movie Duration:</strong> {show.movie.duration} minutes <br />
          </div>
        </>
      ) : (
        <h2>Sorry. Show's not found</h2>
      )}
    </>
  );
}
