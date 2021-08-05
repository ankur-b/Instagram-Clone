import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { Context as AuthContext } from "../Context/AuthContext";
import "./Navbar.css";
const Navbar = () => {
  const { state, Signout } = useContext(AuthContext);
  const history = useHistory();
  const renderList = () => {
    if (state.user) {
      return [
        <li>
          <Link to="/profile">Profile</Link>
        </li>,
        <li>
          <Link to="/createpost">Createpost</Link>
        </li>,
        <li>
          <button
            class="btn waves-effect black waves-light btn-small"
            onClick={() => {
              Signout({ history });
            }}
          >
            Sign Out
          </button>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link to="/login">Login</Link>
        </li>,
        <li>
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <nav className="white">
      <div className="container">
        <div className="nav-wrapper">
          <Link to={state.user ? "/" : "/login"} className="brand-logo">
            Instagram
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
