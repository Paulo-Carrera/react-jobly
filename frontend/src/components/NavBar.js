import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import "./NavBar.css";

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  function loggedInNav() {
    return (
      <>
        <Link to="/companies">Companies</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/" onClick={logout}>Log out {currentUser.username}</Link>
      </>
    );
  }

  function loggedOutNav() {
    return (
      <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </>
    );
  }

  return (
    <nav>
      <Link to="/">Jobly</Link>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );
}

export default NavBar;

