import { Movie } from "./MoviesData.ts";
interface MovieTableProps {
  moviesList: Movie[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function UserTable({
  moviesList,
  onEdit,
  onDelete,
}: MovieTableProps) {
  return (
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
              <button onClick={() => onEdit(movie.id)}>Opdater</button>
              <button onClick={() => onDelete(movie.id)}>Slet</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
