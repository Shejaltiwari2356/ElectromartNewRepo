import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration Successful");
        navigate("/login");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
      // console.log(response);
    } catch (error) {
      console.log("Register", error);
    }
  };

  return (
    <>
      <div className="register-container">
        <h2>Connect your Google account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            {/* <div className="input-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div> */}
            <div className="input-field">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInput}
            />
          </div>
          <div className="input-field">
            <label htmlFor="phone">Phone</label>
            <input
              type="phone"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleInput}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleInput}
            />
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="agreed"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="agreed">
              I agree with Dribbble's <a href="#">Terms of Service</a>,{" "}
              <a href="#">Privacy Policy</a>, and default{" "}
              <a href="#">Notification Settings</a>.
            </label>
          </div>
          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>
        <p className="signin-link">
          Already have an account? <Link to="/login">Sign Up</Link>
        </p>
        <p className="recaptcha-info">
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a>{" "}
          apply.
        </p>
      </div>
    </>
  );
};
