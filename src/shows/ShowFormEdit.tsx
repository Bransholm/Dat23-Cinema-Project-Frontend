import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShow, addShow, show as showInterface } from "../services/showAPI";
import { getMovies, movie as movieInterface } from "../services/movieAPItest";
import { getTheatres, theatre as theatreInterface } from "../services/theatreAPItest";
import { formatDateForBackend } from "../utils/dateUtils";

export default function ShowFormEdit() {
  const { id } = useParams();
  const [show, setShow] = useState<showInterface | null>(null);
  const [error, setError] = useState("");
  const [theatres, setTheatres] = useState<theatreInterface[]>([]);
  const [movies, setMovies] = useState<movieInterface[]>([]);
  const [chosenDate, setChosenDate] = useState<string>("");

  useEffect(() => {
    getShow(Number(id))
      .then((res) => {
        setShow(res as showInterface);
        setChosenDate(res.date); // Set the chosen date separately
      })
      .catch(() => setError("Show not fetched"));
  }, [id]);

  useEffect(() => {
    getTheatres().then((res) => setTheatres(res));
    getMovies().then((res) => setMovies(res));
  }, []);

  if (error !== "") {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  if (show === null) {
    return <h2>Loading...</h2>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setShow({ ...show, [name]: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setChosenDate(value); // Update the chosen date
  };

  // updaye the movie id in the show object by selecting a movie from the dropdown by movie.title and movie.id
  const handleMovieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const movie = movies.find((movie) => movie.id === Number(e.target.value));
    setShow({ ...show, movie: movie ? movie : show.movie });
  };

  // updaye the theatre id in the show object by selecting a theatre from the dropdown by theatre.name and theatre.id
  const handleTheatreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const theatre = theatres.find((theatre) => theatre.id === Number(e.target.value));
    setShow({ ...show, theatre: theatre ? theatre : show.theatre });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log(show.date);
    // console.log(date);

    const { id, movie, theatre, startTime } = show;
    console.log("show", show);
    // const formattedDate = formatDateForBackend(show.date);
    // console.log("formattedDate", formattedDate);

    const formattedDate = formatDateForBackend(chosenDate);
    console.log("formattedDate", formattedDate);

    // Update the show object in the database by submitting show.id, movie.id, theatre.id, date, and updatedStartTime to the server
    const updatedShow = { id, movie: { id: movie.id }, theatre: { id: theatre.id }, date: formattedDate, startTime };
    console.log("updatedShow", updatedShow);

    addShow(updatedShow as showInterface)
      .then(() => {
        alert("Show updated");
        // window.location.href = "/shows";
      })
      .catch(() => setError("Show not updated"));
  };

  // edit the show object by selecting a theatre from the dropdown by theatre.name and theatre.id and a movie from the dropdown by movie.title and movie.id and update the date and startTime but only submit show.id, movie.id and theatre.id and date and startTime to the server to update the show object in the database
  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Show</h2>
      <div>
        <label htmlFor="theatre">Theatre</label>
        <select name="theatre" value={show.theatre.id} onChange={handleTheatreChange}>
          {theatres.map((theatre) => (
            <option key={theatre.id} value={theatre.id}>
              {theatre.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="movie">Movie</label>
        <select name="movie" value={show.movie.id} onChange={handleMovieChange}>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.id}>
              {movie.title}
            </option>
          ))}
        </select>
      </div>
      {/* <div>
        <label htmlFor="date">Date</label>
        <input type="date" name="date" value={show.date} onChange={handleDateChange} />
      </div> */}
      <div>
        <label htmlFor="date">Date</label>
        <input type="date" name="date" value={chosenDate} onChange={handleDateChange} />
      </div>
      <div>
        <label htmlFor="startTime">Start Time</label>
        <input type="time" name="startTime" value={show.startTime} onChange={handleChange} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
