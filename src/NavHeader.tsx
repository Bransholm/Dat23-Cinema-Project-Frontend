import { NavLink, useNavigate } from "react-router-dom";
// import AuthStatus from "./security/AuthStatus";
// import { useAuth } from "./security/AuthProvider";

export default function NavHeader() {
  const navigate = useNavigate();
  //   const auth = useAuth();
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
