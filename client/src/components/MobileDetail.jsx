import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import Footer from "./Footer";

const MobileDetail = ({
  _id,
  name,
  image,
  images,
  rating,
  bought,
  offerprice,
  originalprice,
  description,
  ratedby,
  brand,
  cellulartechnology,
  os,
  ram,
  display,
  rom,
  processorspeed,
  battery,
  discount,
  about,
}) => {
  const [selectedImage, setSelectedImage] = useState(image);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleAddToCart = async () => {
    if (!token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/cart/add",
        {
          productId: _id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Add to Cart Response:", response.data);

      if (response.status === 200 && response.data) {
        alert("Item added to cart successfully!");
        navigate("/cart");
      } else {
        alert("Failed to add item to the cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError("An error occurred while adding the item to the cart.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-start mt-8 space-x-8 p-6 bg-gradient-to-r from-white to-gray-100 rounded-lg shadow-lg">
        {/* Left side - Image Thumbnails Column */}
        <div className="flex flex-col space-y-1 w-1/12">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Product thumbnail ${index + 1}`}
              onClick={() => setSelectedImage(img)}
              className={`cursor-pointer rounded-lg w-24 h-auto border-2 transition-transform transform hover:scale-105 ${
                selectedImage === img ? "border-blue-500" : "border-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Right side - Large Image and Product Info */}
        <div className="w-5/6 flex flex-row items-start">
          {/* Large Image */}
          <div className="mb-4 w-full">
            <img
              src={selectedImage}
              alt="Selected product"
              className="w-3/4 h-1/2 rounded-lg border-2 border-gray-300 shadow-lg transition-transform transform hover:scale-105"
            />
          </div>

          {/* Product Info */}
          <div className="pl-4 w-full">
            <h1 className="text-4xl font-bold mb-4 text-gray-800 hover:text-blue-600 transition duration-300">
              {name}
            </h1>
            <p className="text-lg mb-4 text-gray-600">{description}</p>

            {/* Price Details */}
            <div className="flex items-center mb-4">
              <span className="text-gray-500 line-through mr-2">
                {originalprice}
              </span>
              <span className="text-blue-600 font-bold text-xl">
                {offerprice}
              </span>
              <span className="text-sm text-gray-500 ml-2">{discount} off</span>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mb-4">
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg transform hover:scale-105"
                disabled={loading}
              >
                {loading ? "Adding to Cart..." : "Add to Cart"}
              </button>

              <button
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105"
                onClick={() => navigate("/cart")}
              >
                Buy Now
              </button>

              <button className="bg-pink-600 text-white px-6 py-3 rounded-lg flex items-center hover:bg-pink-700 transition duration-300 shadow-lg transform hover:scale-105">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
                Add to Wishlist
              </button>

              <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition duration-300 shadow-lg transform hover:scale-105">
                Compare
              </button>
            </div>

            {/* Product Specs */}
            <div className="mb-4 space-y-2 border-t border-gray-300 pt-4">
              <p className="border-b border-gray-200 pb-2">
                <strong>Brand:</strong> {brand}
              </p>
              <p className="border-b border-gray-200 pb-2">
                <strong>Rating:</strong> {rating} ({ratedby} reviews)
              </p>
              <p className="border-b border-gray-200 pb-2">
                <strong>Bought:</strong> {bought}
              </p>
              <p className="border-b border-gray-200 pb-2">
                <strong>OS:</strong> {os}
              </p>
              <p className="border-b border-gray-200 pb-2">
                <strong>Display:</strong> {display}
              </p>
              <p className="border-b border-gray-200 pb-2">
                <strong>Cellular Technology:</strong> {cellulartechnology}
              </p>
              <p className="border-b border-gray-200 pb-2">
                <strong>RAM:</strong> {ram}
              </p>
              <p className="border-b border-gray-200 pb-2">
                <strong>Storage:</strong> {rom}
              </p>
              <p className="border-b border-gray-200 pb-2">
                <strong>Processor Speed:</strong> {processorspeed}
              </p>
              <p>
                <strong>Battery:</strong> {battery}
              </p>
              <p className="border-b border-gray-200 pb-2">
                <strong>About:</strong> {about}
              </p>
            </div>

            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
        Similar Products:
      </h2>
      <ProductList category="mobiles" limit={6} />
      <Footer />
    </>
  );
};

MobileDetail.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  rating: PropTypes.number.isRequired,
  bought: PropTypes.string.isRequired,
  offerprice: PropTypes.string.isRequired,
  originalprice: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ratedby: PropTypes.number.isRequired,
  brand: PropTypes.string.isRequired,
  cellulartechnology: PropTypes.string.isRequired,
  os: PropTypes.string.isRequired,
  ram: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
  rom: PropTypes.string.isRequired,
  processorspeed: PropTypes.string.isRequired,
  battery: PropTypes.string.isRequired,
  discount: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
};

export default MobileDetail;
