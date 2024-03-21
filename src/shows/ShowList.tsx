import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShowInterfaceTheatre, getShows } from "../services/showAPI";
import "./showStyle.css";
import { formatDate } from "../utils/dateUtils";

export default function ShowList() {
  const [shows, setShows] = useState<ShowInterfaceTheatre[]>([]);
  const [filteredShows, setFilteredShows] = useState<ShowInterfaceTheatre[]>([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>("");
  const [selectedMovieFilter, setSelectedMovieFilter] = useState<string>("");
  const [dateOptions, setDateOptions] = useState<string[]>([]);
  const [movieOptions, setMovieOptions] = useState<string[]>([]);

  useEffect(() => {
    getShows()
      .then((res) => {
        setShows(res as ShowInterfaceTheatre[]);
        setFilteredShows(res as ShowInterfaceTheatre[]);

        const uniqueDates = Array.from(new Set(res.map((show) => show.date)));
        setDateOptions(uniqueDates);

        const uniqueMovies = Array.from(new Set(res.map((show) => ("title" in show.movie ? show.movie.title : undefined)).filter((title): title is string => title !== undefined)));
        setMovieOptions(uniqueMovies);
         console.log("show", res);
      })
      .catch(() => setError("Shows not fetched"));
  }, []);

  useEffect(() => {
    filterShows();
  }, [searchQuery, selectedDateFilter, selectedMovieFilter]);

  const filterShows = () => {
    let filtered = shows;

    if (searchQuery) {
      filtered = filtered.filter((show) => show.movie.title?.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (selectedDateFilter) {
      filtered = filtered.filter((show) => show.date === selectedDateFilter);
    }

    if (selectedMovieFilter) {
      filtered = filtered.filter((show) => show.movie.title === selectedMovieFilter);
    }

    setFilteredShows(filtered);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDateFilter = (selectedDate: string) => {
    setSelectedDateFilter(selectedDate);
  };

  const handleMovieFilter = (selectedMovie: string) => {
    setSelectedMovieFilter(selectedMovie);
  };

  const handleEditClick = () => {
    console.log("Edit button clicked");
  };



  const showListItems = filteredShows.map((show) => (
    <li key={show.id} className="show-list-item">
      <Link to={`/shows/${show.id}`}>
        <h3>{show.movie.title} </h3>
        <strong>Date:</strong> {formatDate(show.date)} <br />
        <strong>Start Time:</strong> {show.startTime} <br />
        <strong>Movie Duration:</strong> {show.movie.duration} minutes <br />
        <strong>Theatre:</strong> {show.theatre.name} <br />
      </Link>
      <Link to={`/shows/edit/${show.id}`}>
        <button id="editShow" onClick={handleEditClick}>
          Edit
        </button>
      </Link>
    </li>
   
    
  ));

  if (error) {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  return (
    <>
      <div className="header">
        <h2>Shows</h2>
        <div className="dropdowns">
          <label>
            Search by Movie Title:
            <input type="text" value={searchQuery} onChange={handleChange} />
          </label>
          <select onChange={(e) => handleDateFilter(e.target.value)}>
            <option value="">Filter by Date</option>
            {dateOptions.map((option, index) => (
              <option key={index} value={option}>
                {formatDate(option)}
              </option>
            ))}
          </select>
          <select onChange={(e) => handleMovieFilter(e.target.value)}>
            <option value="">Filter by Movie</option>
            {movieOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      {filteredShows.length > 0 ? (
        <div>
          <ul>{showListItems}</ul>
        </div>
      ) : (
        <h2>Sorry. No matching shows found</h2>
      )}
    </>
  );
}
