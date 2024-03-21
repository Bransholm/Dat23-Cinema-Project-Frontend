import { useState } from "react";
import { Movie } from "./MoviesData.ts";
import MoviePutRoute from "./AdminMovieAPI/AdminMoviePut.ts";
import MoviePostRoute from "./AdminMovieAPI/AdminMoviePost.ts";
import getMovies from "./AdminMovieAPI/AdminMovieRead.ts";
// import fetchMovie from "./AdminMovieFilter.tsx"
// import {setFilteredMovies} from "./AdminMovieFilter.tsx"

interface MovieTableProps {
  moviesList: Movie[];
  onEdit: (id: number, updatedMovie: Movie) => void;
  onDelete: (id: number) => void;
  setFilteredMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

export default function UserTable({
  moviesList,
  onEdit,
  onDelete,
  setFilteredMovies,
}: MovieTableProps) {
  // Stores the movie chosen to be updated
  const [editMovie, setEditMovie] = useState<Movie | null>(null);
  // -------- Values below are all the movie values from the update-movie-form (Habing use state for every value, makes it a 'controlled' form).
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  const [updatedDescription, setUpdatedDescription] = useState<string>("");
  const [updatedActors, setUpdatedActors] = useState<string>("");
  const [updatedDuration, setUpdatedDuration] = useState<number>(0);
  const [updatedGenre, setUpdatedGenre] = useState<string>("");
  const [updatedIs3D, setUpdatedIs3D] = useState<boolean>(false);
  const [updatedIsActive, setUpdatedIsActive] = useState<boolean>(false);

  // Takes the id number from the item-clicked and find the movie with the same id.
  const handleEditClick = (id: number) => {
    const movieToEdit = moviesList.find((movie) => movie.id === id);
    console.log("Handle Edit - id", id, " movie: ", movieToEdit);
    if (movieToEdit) {
      setEditMovie(movieToEdit);
      setUpdatedTitle(movieToEdit.title);
      setUpdatedDescription(movieToEdit.description);
      setUpdatedActors(movieToEdit.actors);
      setUpdatedDuration(movieToEdit.duration);
      setUpdatedGenre(movieToEdit.genre);
      setUpdatedIs3D(movieToEdit.threeD);
      setUpdatedIsActive(movieToEdit.active);
    }
  };

  const resetForm = () => {
    setUpdatedTitle("");
    setUpdatedDescription("");
    setUpdatedActors("");
    setUpdatedDuration(0);
    setUpdatedGenre("");
    setUpdatedIs3D(false);
    setUpdatedIsActive(false);
  };

  const handleCloseDialog = () => {
    setEditMovie(null);
  };

  const handleSaveMovie = () => {
    if (editMovie) {
      const updatedMovie: Movie = {
        ...editMovie,
        title: updatedTitle,
        description: updatedDescription,
        actors: updatedActors,
        duration: updatedDuration,
        genre: updatedGenre,
        threeD: updatedIs3D,
        active: updatedIsActive,
      };

      MoviePutRoute(updatedMovie)
        .then((updateMovieFromServer) => {
          onEdit(editMovie.id!, updateMovieFromServer);
          setEditMovie(null);
          resetForm();

          getMovies()
            .then((movies) => {
              setFilteredMovies(movies);
            })
            .catch((error) => {
              console.error("Error fetching movies ", error);
            });
        })
        .catch((error) => {
          console.error("Error update movie - ", error);
        });
    } else {
      const newMovie: Movie = {
        title: updatedTitle,
        description: updatedDescription,
        actors: updatedActors,
        duration: updatedDuration,
        genre: updatedGenre,
        threeD: updatedIs3D,
        active: updatedIsActive,
      };

      MoviePostRoute(newMovie)
        .then((createdMovieFromServer) => {
          console.log(createdMovieFromServer);
          getMovies()
          .then((movies) => {
            setFilteredMovies(movies);
          })
          .catch((error) => {
            console.error("Error fetching movies ", error);
          });
        })
        .catch((error) => {
          console.error("Error creating a new movie: - ", error);
        });
      }
      resetForm();
  };

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actors</th>
            <th>Duration</th>
            <th>Genre</th>
            <th>3D</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {moviesList.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.description}</td>
              <td>{movie.actors}</td>
              <td>{movie.duration}</td>
              <td>{movie.genre}</td>
              <td>{movie.threeD ? "Active" : "Inactive"}</td>
              <td>{movie.active ? "Active" : "Inactive"}</td>
              <td>
                <button onClick={() => handleEditClick(movie.id ?? 0)}>
                  Opdater
                </button>
                <button onClick={() => onDelete(movie.id ?? 0)}>Slet</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form>
        <div className="dialog">
          <h2>{editMovie ? "Opdater Film Data" : "Opret Ny Film"}</h2>
          <label>
            Titel:
            <input
              type="text"
              name="title"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          </label>
          <label>
            Beskrivelse:
            <input
              type="text"
              name="duration"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
          </label>
          <label>
            Skuespillere:
            <input
              type="text"
              name="actors"
              value={updatedActors}
              onChange={(e) => setUpdatedActors(e.target.value)}
            />
          </label>
          <label>
            Spilletid:
            <input
              type="number"
              name="duration"
              value={updatedDuration}
              onChange={(e) => setUpdatedDuration(parseInt(e.target.value))}
            />
          </label>
          <label>
            Genre:
            <input
              type="text"
              name="genre"
              value={updatedGenre}
              onChange={(e) => setUpdatedGenre(e.target.value)}
            />
          </label>
          <label>
            3D Film
            <input
              type="checkbox"
              name="is3D"
              checked={updatedIs3D}
              onChange={(e) => setUpdatedIs3D(e.target.checked)}
            />
          </label>
          <label>
            Aktiv Film
            <input
              type="checkbox"
              name="isActive"
              checked={updatedIsActive}
              onChange={(e) => setUpdatedIsActive(e.target.checked)}
            />
          </label>
          <label>
            <button type="button" onClick={handleSaveMovie}>
              {editMovie ? "Opdater" : "Ny"}
            </button>
            <button type="button" onClick={handleCloseDialog}>
              Cancel
            </button>
          </label>
        </div>
      </form>
    </section>
  );
}
