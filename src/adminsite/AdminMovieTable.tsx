import { useState } from "react";
import {
  getMovies,
  movie,
  MoviePutRoute,
  MoviePostRoute,
} from "../services/movieApi.ts";

interface MovieTableProps {
  moviesList: movie[];
  onEdit: (id: number, updatedMovie: movie) => void;
  setFilteredMovies: React.Dispatch<React.SetStateAction<movie[]>>;
}

export default function UserTable({
  moviesList,
  onEdit,
  setFilteredMovies,
}: MovieTableProps) {
  // Stores the movie chosen to be updated
  const [editMovie, setEditMovie] = useState<movie | null>(null);
  // -------- Values below are all the movie values from the update-movie-form (Having use state for every value, makes it a 'controlled' form).
  const [movieId, setMovieId] = useState<number>(0);
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
    // Checks if the movieToEdit state is true.  If it is it sets states of all the attributes to those of the selected movie-object
    if (movieToEdit) {
      setMovieId(movieToEdit.id);
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

  // When the "submit-button" is pressed this function updates or creates a movie.
  const handleSaveMovie = () => {
    // If editMovie is true a movie is updated.
    if (editMovie) {
      // Here the updatedMovie object is set and parsed to the MoviePutRoute.
      const updatedMovie: movie = {
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
        .then((updateMovieFromServer: movie) => {
          onEdit(editMovie.id!, updateMovieFromServer);

          // Sets the editMovie to null after the update is complete.
          setEditMovie(null);
          resetForm();

          // Here the movie table is refreshed.
          getMovies()
            .then((movies) => {
              setFilteredMovies(movies);
            })
            .catch((error) => {
              console.error("Error fetching movies ", error);
            });
        })
        .catch((error: Error) => {
          console.error("Error update movie - ", error);
        });

      // If editMovie is false a new movie is created.
    } else {
      const newMovie: movie = {
        id: movieId,
        title: updatedTitle,
        description: updatedDescription,
        actors: updatedActors,
        duration: updatedDuration,
        genre: updatedGenre,
        threeD: updatedIs3D,
        active: updatedIsActive,
      };

      MoviePostRoute(newMovie)
        .then((createdMovieFromServer: movie) => {
          console.log(createdMovieFromServer);
          // Here the movie table is refreshed.
          getMovies()
            .then((movies) => {
              setFilteredMovies(movies);
            })
            .catch((error) => {
              console.error("Error fetching movies ", error);
            });
        })
        .catch((error: Error) => {
          console.error("Error creating a new movie: - ", error);
        });
    }
    resetForm();
  };

  function displayGenre(movieGenre: string): string | undefined {
    const genres: { [key: string]: string } = {
      other: "Andet",
      action: "Action",
      comedy: "Komedie",
      drama: "Drama",
      horror: "Gyser",
    };

    for (const genre in genres) {
      if (movieGenre == genre) {
        return genres[genre];
      }
    }
    return movieGenre;
  }

  return (
    <section>
      <table>
        <thead>
          <tr>
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
              <td>{displayGenre(movie.genre)}</td>
              <td>{movie.threeD ? "Active" : "Inactive"}</td>
              <td>{movie.active ? "Active" : "Inactive"}</td>
              <td>
                <button onClick={() => handleEditClick(movie.id ?? 0)}>
                  Opdater
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form>
        <div className="dialog">
          {/*Sets the text of the depending on editMovie is true or false*/}
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
            <select
              value={updatedGenre}
              onChange={(e) => setUpdatedGenre(e.target.value)}
            >
              <option value="other">Andet</option>
              <option value="action">Action</option>
              <option value="comedy">Komedie</option>
              <option value="drama">Drama</option>
              <option value="horror">Gyser</option>
            </select>
          </label>
          <label>
            3D Film:
            <input
              type="checkbox"
              name="is3D"
              checked={updatedIs3D}
              onChange={(e) => setUpdatedIs3D(e.target.checked)}
            />
          </label>
          <label>
            Aktiv Film:
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
