import React from "react";
import "./Home.css";
import ProductList from "../components/ProductList";
import SimpleSlider from "../components/Slider";
import Footer from "../components/Footer"

export const Home = () => {
  return (
    <div>
        <SimpleSlider />
      <section className="features">
        <div className="feature-item">Special Gift Cards</div>
        <div className="feature-item">Secure Payment</div>
        <div className="feature-item">24/7 Support</div>
        <div className="feature-item">Free Shipping</div>
      </section>
      <h2 className="heading">Featured Products</h2>
      <section className="product-list">
        <div className="products">
          {/* Repeat this block for each product */}
          {/* <div className="product-item">
            <img src="path/to/image.jpg" alt="Product" />
            <h3>Product Name</h3>
            <p>$Price</p>
            <button>Add to Cart</button>
          </div> */}
          <ProductList />
        </div>
      </section>
      <Footer />
      {/* <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 ElectroMart. All Rights Reserved.</p>
        </div>
      </footer> */}
    </div>
  );
};
