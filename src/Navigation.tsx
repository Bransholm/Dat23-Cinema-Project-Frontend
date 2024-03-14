import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Aktuelle Film</Link>
        </li>
        <li>
          <Link to="/">Enkelt Film</Link>
        </li>
        <li>
          <Link to="/">Booking</Link>
        </li>
        <li>
          <Link to="/customer-movies">Kunde Film Oversigt</Link>
        </li>
        <li>
          <Link to="/admin-movies"> Admin Film Oversigt </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
