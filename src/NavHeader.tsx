import { NavLink } from "react-router-dom";
// import AuthStatus from "./security/AuthStatus";
// import { useAuth } from "./security/AuthProvider";

export default function NavHeader() {
  //   const auth = useAuth();
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home/Forestillinger</NavLink>
        </li>
        <li>
          <NavLink to="/reservations">Reservations</NavLink>
        </li>
        {/* <AuthStatus /> */}
      </ul>
    </nav>
  );
}
