import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <ul>
        <li><Link to="/">Google Book Search</Link></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/saved">Saved Books</Link></li>
      </ul>
    </header>
  )
};

export default Header;