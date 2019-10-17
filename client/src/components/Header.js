import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <ul>
        <li><Link to="/">Google Book Search</Link></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/saved">Saved Books</Link></li>
        <li className="socket-msg hide">A new book is saved!<p></p></li>
      </ul>
    </header>
  )
};

export default Header;