import { NavLink } from "react-router-dom";
// import AuthStatus from "./security/AuthStatus";
// import { useAuth } from "./security/AuthProvider";

export default function NavHeader() {
  //   const auth = useAuth();
  return (
    <nav>
      <ul>
        <li className="custom-tab">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="custom-tab">
          <NavLink to="/shows">Shows</NavLink>
        </li>
        <li className="custom-tab">
          <NavLink to="/shows/create">Create Show</NavLink>
        </li>
        <li className="custom-tab">
          <NavLink to="/admin-movies"> Admin Film Oversigt </NavLink>
        </li>
        {/* <AuthStatus /> */}
      </ul>
    </nav>
  );
}
