import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

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
    <div className="navbar">
      <NavLink to="/" className="navlink">
        <div className="navbar-brand">ElectroMart </div>
      </NavLink>
      <ul className="navbar-links">
        <li>
          <a href="/">All Categories</a>
        </li>
        <li>
          <a href="/">Contact</a>
        </li>
        <li>
          <a href="/">Special</a>
        </li>
        <li>
          <a href="/">Best Seller</a>
        </li>
        <li>
          <a href="/">New Arrivals</a>
        </li>
      </ul>
      <div className="navbar-search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="signin-login">
        <NavLink to="/register" className="navlink">
          <div className="">Sign Up </div>
        </NavLink>
        <NavLink to="/login" className="navlink">
          <div className="">Sign In</div>
        </NavLink>
        <NavLink to="/cart" className="navlink">
          <div className="">My Cart</div>
        </NavLink>
      </div>
    </div>
  );
};
