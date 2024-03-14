import { Movie } from "./MoviesData.ts";
// import { moviesList } from "./MoviesData";
// Define the props interface
interface MovieTableProps {
  moviesList: Movie[];
}
// export default function UserTable({ users }: UserTableProps) {

export default function UserTable({ moviesList }: MovieTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Duration</th>
          <th>3D</th>
          <th>Active</th>
        </tr>
      </thead>
      <tbody>
        {moviesList.map((movie) => (
          <tr key={movie.id}>
            <td>{movie.title}</td>
            <td>{movie.duration}</td>
            <td>{movie.is3D ? "Active" : "Inactive"}</td>
            <td>{movie.isActive ? "Active" : "Inactive"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
