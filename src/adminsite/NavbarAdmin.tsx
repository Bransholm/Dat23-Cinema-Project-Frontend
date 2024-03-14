import { NavLink } from "react-router-dom";

export default function NavbarAdmin() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/movies-overview">Something</NavLink>
        </li>
        <li>
          <NavLink to="/reservations-overview">Something</NavLink>
        </li>
        <li>
          <NavLink to="/price-overview">Something</NavLink>
        </li>
        <li>
          <NavLink to="/employees-overview">Something</NavLink>
        </li>
      </ul>
    </nav>
  );
}
