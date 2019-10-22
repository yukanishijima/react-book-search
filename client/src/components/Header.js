import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <ul>
        <li><Link to="/" className={window.location.pathname === "/" ? "active" : ""}>Home</Link></li>
        <li><Link to="/saved" className={window.location.pathname === "/saved" ? "active" : ""}>Saved Books</Link></li>
      </ul>
      <div className="socket-msg hide">
        <h4>A new book has been saved:</h4>
        <p></p>
      </div>
    </header>
  )
};

export default Header;