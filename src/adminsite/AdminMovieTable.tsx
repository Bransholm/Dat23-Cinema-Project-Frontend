import { useState } from "react";
import { Movie } from "./MoviesData.ts";
import MoviePutRoute from "./AdminMovieAPI/AdminMoviePost.ts";

// props = ?
interface MovieTableProps {
  moviesList: Movie[];
  onEdit: (id: number, updatedMovie: Movie) => void;
  onDelete: (id: number) => void;
}

export default function UserTable({
  moviesList,
  onEdit,
  onDelete,
}: MovieTableProps) {
  // Stores the movie chosen to be updated
  const [editMovie, setEditMovie] = useState<Movie | null>(null);
  // -------- Values below are all the movie values from the update-movie-form (Habing use state for every value, makes it a 'controlled' form).
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  const [updatedDuration, setUpdatedDuration] = useState<number>(0);
  const [updatedIs3D, setUpdatedIs3D] = useState<boolean>(false);
  const [updatedIsActive, setUpdatedIsActive] = useState<boolean>(false);

  // Takes the id number from the item-clicked and find the movie with the same id.
  const handleEditClick = (id: number) => {
    const movieToEdit = moviesList.find((movie) => movie.id === id);
    if (movieToEdit) {
      setEditMovie(movieToEdit);
      setUpdatedTitle(movieToEdit.title);
      setUpdatedDuration(movieToEdit.duration);
      setUpdatedIs3D(movieToEdit.is3D);
      setUpdatedIsActive(movieToEdit.isActive);
    }
  };

  const handleCloseDialog = () => {
    setEditMovie(null);
  };

  const handleUpdateMovie = () => {
    if (editMovie) {
      const updatedMovie: Movie = {
        ...editMovie,
        title: updatedTitle,
        duration: updatedDuration,
        is3D: updatedIs3D,
        isActive: updatedIsActive,
      };

      MoviePutRoute(editMovie.id, updatedMovie)
        .then((updateMovieFromServer) => {
          onEdit(editMovie.id!, updateMovieFromServer);
          setEditMovie(null);
        })
        .catch((error) => {
          console.error("Error update movie - ", error);
        });
    }
  };

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Duration</th>
            <th>3D</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {moviesList.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.duration}</td>
              <td>{movie.is3D ? "Active" : "Inactive"}</td>
              <td>{movie.isActive ? "Active" : "Inactive"}</td>
              <td>
                <button onClick={() => handleEditClick(movie.id)}>
                  Opdater
                </button>
                <button onClick={() => onDelete(movie.id)}>Slet</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form>
        {editMovie && (
          <div className="dialog">
            <h2>Opdater Film</h2>
            <label>
              <input
                type="text"
                name="title"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </label>
            <label>
              <input
                type="number"
                name="duration"
                value={updatedDuration}
                onChange={(e) => setUpdatedDuration(parseInt(e.target.value))}
              />
            </label>
            <label>
              <input
                type="checkbox"
                name="is3D"
                checked={updatedIs3D}
                onChange={(e) => setUpdatedIs3D(e.target.checked)}
              />
            </label>
            <label>
              <input
                type="checkbox"
                name="isActive"
                checked={updatedIsActive}
                onChange={(e) => setUpdatedIsActive(e.target.checked)}
              />
            </label>
            <label>
              <button type="button" onClick={handleUpdateMovie}>
                Update
              </button>
              <button type="button" onClick={handleCloseDialog}>
                Cancel
              </button>
            </label>
          </div>
        )}
      </form>
    </section>
  );
}
