import { useEffect, useState } from "react";
import { addShow, show as showInterface } from "../services/showAPI";
import { getMovies, movie as movieInterface } from "../services/movieApi";
import {
  getTheatres,
  theatre as theatreInterface,
} from "../services/theatreApiFacade";
import { formatDateForBackend, formatTimeForBackend } from "../utils/dateUtils"; // Import a utility function to format the date

const EMPTY_SHOW = {
  id: null,
  movie: {
    id: 0,
  },
  theatre: {
    id: 0,
  },
  date: "",
  startTime: "",
};

export default function ShowFormCreate() {
  const [movies, setMovies] = useState<movieInterface[]>([]);
  const [theatres, setTheatres] = useState<theatreInterface[]>([]);
  const [formData, setFormData] = useState<showInterface>(EMPTY_SHOW);
  const [chosenMovie, setChosenMovie] = useState<number | null>(null); // Updated chosenMovie state to handle null
  const [chosenTheatre, setChosenTheatre] = useState<number | null>(null); // Updated chosenTheatre state to handle null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await getMovies();
        const theatreResponse = await getTheatres();
        setMovies(movieResponse);
        setTheatres(theatreResponse);
      } catch (error) {
        console.error("Error fetching data when creating show", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Check if both movie and theatre are chosen, then submit
    if (chosenMovie !== null && chosenTheatre !== null) {
      handleSubmit();
    }
  }, [chosenMovie, chosenTheatre]);

  const handleMovieChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const movieId = parseInt(value);
    setChosenMovie(movieId); // Update chosenMovie state
    setFormData((prevFormData) => ({
      ...prevFormData,
      movie: { id: movieId },
    }));
  };

  const handleTheatreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const theatreId = parseInt(value);
    setChosenTheatre(theatreId); // Update chosenTheatre state
    setFormData((prevFormData) => ({
      ...prevFormData,
      theatre: { id: theatreId },
    }));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, date: value }));
  };

  const handleStartTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, startTime: value }));
  };

  const handleSubmit = async () => {
    if (chosenMovie && chosenTheatre) {
      const formattedDate = formatDateForBackend(formData.date);
      const formattedStartTime = formatTimeForBackend(formData.startTime);

      const newFormData = {
        ...formData,
        date: formattedDate,
        startTime: formattedStartTime,
      };

      const newShow = await addShow(newFormData);
      console.log("New show", newShow);
      setFormData(EMPTY_SHOW);
      setChosenMovie(null);
      setChosenTheatre(null);
    } else {
      console.error("Please choose a movie and a theatre.");
    }
  };

  const activeMoviesOptions = movies
    .filter((movie) => movie.active)
    .map((movie) => (
      <option key={movie.id} value={movie.id}>
        {movie.title} - {movie.duration} min
      </option>
    ));

  const theatreOptions = theatres.map((theatre) => (
    <option key={theatre.id} value={theatre.id}>
      {theatre.name}
    </option>
  ));

  return (
    <div>
      <h2>Create a new show</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="movie">Movie</label>
        <select
          id="movie"
          onChange={handleMovieChange}
          value={chosenMovie ?? ""}
        >
          <option value="">Choose a movie</option>
          {activeMoviesOptions}
        </select>
        <br />
        <label htmlFor="theatre">Theatre</label>
        <select
          id="theatre"
          onChange={handleTheatreChange}
          value={chosenTheatre ?? ""}
        >
          <option value="">Choose a theatre</option>
          {theatreOptions}
        </select>
        <br />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          onChange={handleDateChange}
          value={formData.date}
        />
        <br />
        <label htmlFor="startTime">Start time</label>
        <input
          type="time"
          id="startTime"
          onChange={handleStartTimeChange}
          value={formData.startTime}
        />
        <br />
        <button type="button" onClick={handleSubmit}>
          Create show
        </button>
      </form>
    </div>
  );
}
