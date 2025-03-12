import React from 'react';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
  return (
    <nav>
      <h1>Navigation</h1>
      <ul>
        <li>
          <Link to="/candidates">
            Candidates
          </Link>
        </li>
        <li>
          <Link to="/saved">
            Saved Candidates
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
