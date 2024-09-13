import React from "react";
import { NavLink } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg text-center">
      <h1 className="text-3xl font-semibold mb-4">Thank You!</h1>
      <p className="text-lg">
        Your payment was successful. We appreciate your business!
      </p>
      <NavLink to="/" className="navlink" style={{ color: "black" }}>
        <div className="">Continue Shopping</div>
      </NavLink>
    </div>
  );
};

export default ThankYouPage;
