import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/admin-movies"> Admin Film Oversigt </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
