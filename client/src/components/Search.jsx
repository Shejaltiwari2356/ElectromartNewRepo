import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Search = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const query = useQuery().get("q");
  console.log("Query parameter:", query);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/auth/search?q=${query}`
        );
        console.log("Response data:", response.data); // Inspect the response data
        setProducts(response.data); // Assuming the response.data is an array of products
      } catch (error) {
        console.error("Error fetching search results", error);
        setError("Failed to fetch search results. Please try again.");
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  console.log("Products state:", products);
  return (
    <div className="product-list">
      {error && <p className="error-message">{error}</p>}
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div className="product-card" key={product._id}>
            <Link to={`/products/${product._id}`} className="product-link">
              <div className="badge">New Launch</div>
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h2 className="product-name">{product.name}</h2>
              <div className="price">
                {product.offerprice}{" "}
                <span className="original-price">{product.originalprice}</span>{" "}
                <span className="discount">{product.discount} off</span>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default Search;
