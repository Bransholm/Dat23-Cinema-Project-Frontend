import { NavLink, useNavigate } from "react-router-dom";
import AuthStatus from "./security/AuthStatus";
import { useAuth } from "./security/AuthProvider";

export default function NavHeader() {
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <nav>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Gå Tilbage
      </button>
      <ul>
        <li className="custom-tab">
          <NavLink to="/">Home/Forestillinger</NavLink>
        </li>
        <li className="custom-tab">
          <NavLink to="/reservations">Reservations</NavLink>
        </li>
        <li className="custom-tab">
          <NavLink to="/shows">Shows</NavLink>
        </li>
        {auth.isLoggedIn() && (
        <li className="custom-tab">
          <NavLink to="/shows/create">Create Show</NavLink>
        </li> 
        )}
        {auth.isLoggedIn() && (
          <li className="custom-tab">
            <NavLink to="/movies"> Admin Film Oversigt </NavLink>
          </li>
        )}
        <AuthStatus />
      </ul>
    </nav>
  );
}
