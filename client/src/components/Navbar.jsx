import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar">
      {/* Logo/Brand */}
      <NavLink to="/" className="logo">
        ElectroMart
      </NavLink>

      {/* Links */}
      <ul className="nav-links">
        <li>
          <NavLink to="/" className="nav-link">
            All Categories
          </NavLink>
        </li>
        <li>
          <NavLink to="/compare" className="nav-link">
            Compare
          </NavLink>
        </li>
        <li>
          <NavLink to="/special" className="nav-link">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/service" className="nav-link">
            Repair & Service
          </NavLink>
        </li>
        <li>
          <NavLink to="/wishlist" className="navlink">
            <div className="">Wishlist </div>
          </NavLink>
        </li>
      </ul>

      {/* Search Bar */}
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      {/* Sign In/Sign Up/Cart */}
      <div className="auth-links">
        {/* <NavLink to="/register" className="auth-link">Sign Up</NavLink> */}
        <div className="icon-and-text">
          <NavLink to="/login" className="auth-link">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>{" "}
            Sign In{" "}
          </NavLink>
        </div>
        <NavLink to="/cart" className="auth-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-cart"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
          My Cart
        </NavLink>
      </div>
    </nav>
  );
};
