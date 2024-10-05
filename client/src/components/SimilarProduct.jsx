import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SimilarProduct = ({ offerprice, productId }) => {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/products/similar`,
          {
            params: { offerprice, excludeProductId: productId }, // Send offerprice and exclude the current product
          }
        );
        setSimilarProducts(response.data);
      } catch (err) {
        console.error("Error fetching similar products:", err);
        setError("Failed to load similar products.");
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [offerprice, productId]);

  const handleViewProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Similar Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-lg p-4 cursor-pointer"
              onClick={() => handleViewProduct(product._id)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="mt-4">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-600">{product.brand}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-500 line-through">
                    {product.originalprice}
                  </span>
                  <span className="text-blue-500 font-bold">
                    {product.offerprice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

SimilarProduct.propTypes = {
  offerprice: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
};

export default SimilarProduct;
