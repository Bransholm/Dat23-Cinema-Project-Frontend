import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Customer View</Link>
        </li>
        <li>
          <Link to="/">Login (Admin)</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
