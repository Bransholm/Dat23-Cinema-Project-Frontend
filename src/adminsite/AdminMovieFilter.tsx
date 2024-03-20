import React, { useState, useEffect } from "react";
import UserTable from "./AdminMovieTable";
import getMovies from "./AdminMovieAPI/AdminMovieRead";
import { Movie } from "./MoviesData";

export default function MovieFilter() {
  // const [movieList, setMovieList] = useState<Movie[]>(MoviesList);
  // const [fetchedMovies, setFetchedMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  // UseStates that stores the selected filtere and sort options
  const [durationFilter, setDurationFilter] = useState<string>("");
  const [isActiveFilter, setIsActiveFilter] = useState<string>("");
  const [is3dFilter, setIs3dFilter] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  useEffect(() => {
    getMovies()
      .then((movies) => {
        setFilteredMovies(movies);
      })
      .catch((error) => {
        console.error("Error fetching movies: ", error);
      });
  }, []);

  useEffect(() => {
    filterMovies();
  }, [durationFilter, isActiveFilter, is3dFilter, sortOption]);

  const handleEdit = (id, updatedMovie) => {
    const updatedMovieList = filteredMovies.map((movie) => {
      if (movie.id === id) {
        return updatedMovie;
      }
      return movie;
    });
    setFilteredMovies(updatedMovieList);
  };

  const handleDelete = (id) => {
    const updatedMovieList = filteredMovies.filter((movie) => movie.id !== id);
    setFilteredMovies(updatedMovieList);
  };

  const filterMovies = () => {
    let filtered = filteredMovies.slice();

    // Her bliver film-listen sorteret på baggrund af alle filtrene
    if (durationFilter === "120+") {
      filtered = filtered.filter((movie) => movie.duration >= 120);
    } else if (durationFilter === "below 120") {
      filtered = filtered.filter((movie) => movie.duration < 120);
    }

    if (isActiveFilter === "active") {
      filtered = filtered.filter((movie) => movie.active);
    } else if (isActiveFilter === "inactive") {
      filtered = filtered.filter((movie) => !movie.active);
    }

    if (is3dFilter === "3D") {
      filtered = filtered.filter((movie) => movie.is3D);
    } else if (is3dFilter === "2D") {
      filtered = filtered.filter((movie) => !movie.is3D);
    }

    // Her bliver film-listen sorteret på baggrund af sortOption
    if (sortOption === "title-ascending") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "title-descending") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "duration-acsending") {
      filtered.sort((a, b) => a.duration - b.duration);
    } else if (sortOption === "duration-descending") {
      filtered.sort((a, b) => b.duration - a.duration);
    }

    setFilteredMovies([...filtered]);
  };

  const handleDurationFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDurationFilter(event.target.value);
  };

  const handleIsActiveFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsActiveFilter(event.target.value);
  };

  const handle3dFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIs3dFilter(event.target.value);
  };

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  return (
    <>
      <div>
        <label>
          Filtrer efter længde:
          <select value={durationFilter} onChange={handleDurationFilterChange}>
            <option value="">ALL</option>
            <option value="120+">120 and above</option>
            <option value="below 120">below 120</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Filter by Active Status:
          <select value={isActiveFilter} onChange={handleIsActiveFilterChange}>
            <option value="">ALL</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        <label>
          Filtre efter Dimensioner:
          <select value={is3dFilter} onChange={handle3dFilterChange}>
            <option value="">Alle</option>
            <option value="3D">3D</option>
            <option value="2D">2D</option>
          </select>
        </label>
        <label>
          Sorter efter:
          <select value={sortOption} onChange={handleSortByChange}>
            <option value="">Intet</option>
            <option value="title-ascending">A-Å</option>
            <option value="title-descending">Å-A</option>
            <option value="duration-acsending">Korteste</option>
            <option value="duration-descending">Længste</option>
          </select>
        </label>
      </div>
      <UserTable
        moviesList={filteredMovies}
        // moviesList={moviesList}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
}
