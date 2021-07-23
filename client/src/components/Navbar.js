import React from "react";
import {Link} from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {
  return (
    <nav className="white">
      <div className="container">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            Instagram
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/createpost">Createpost</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
