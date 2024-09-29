import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TVDetail = ({
  _id,
  name,
  brand,
  offerprice,
  originalprice,
  size,
  resolution,
  display_type,
  speaker_power,
  voltage,
  hdmi_ports,
  image,
  images,
  rating,
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
    <div className="flex justify-between items-start mt-8 space-x-8">
      {/* Left side - Image Thumbnails Column */}
      <div className="flex flex-col space-y-1 w-1/12">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Product thumbnail ${index + 1}`}
            onClick={() => setSelectedImage(img)}
            className={`cursor-pointer rounded-lg w-3/2 h-auto border-2 ${
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
            className="w-full h-auto"
          />
        </div>

        {/* Product Info */}
        <div className="pl-4 w-full">
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          <p className="text-lg mb-4">{about}</p>

          {/* Price Details */}
          <div className="flex items-center mb-4">
            <span className="text-gray-500 line-through mr-2">
              {originalprice}
            </span>
            <span className="text-blue-500-md font-bold">{offerprice}</span>
            <span className="text-sm text-gray-500 ml-2">{discount} off</span>
          </div>

          {/* Buttons */}
          <div className="mb-4">
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-8 py-2 rounded-lg mr-4"
              disabled={loading}
            >
              {loading ? "Adding to Cart..." : "Add to Cart"}
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={() => navigate("/cart")}
            >
              Buy Now
            </button>
          </div>

          {/* Product Specs */}
          <div className="mb-4">
            <p>
              <strong>Brand:</strong> {brand}
            </p>
            <p>
              <strong>Rating:</strong> {rating} ({ratedby} ratings)
            </p>
            <p>
              <strong>Size:</strong> {size}
            </p>
            <p>
              <strong>Resolution:</strong> {resolution}
            </p>
            <p>
              <strong>Display Type:</strong> {display_type}
            </p>
            <p>
              <strong>Speaker Power:</strong> {speaker_power}
            </p>
            <p>
              <strong>Voltage:</strong> {voltage}
            </p>
            <p>
              <strong>HDMI Ports:</strong> {hdmi_ports}
            </p>
          </div>

          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

TVDetail.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  offerprice: PropTypes.string.isRequired,
  originalprice: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  resolution: PropTypes.string.isRequired,
  display_type: PropTypes.string.isRequired,
  speaker_power: PropTypes.string.isRequired,
  voltage: PropTypes.string.isRequired,
  hdmi_ports: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  rating: PropTypes.number.isRequired,
  discount: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
};

export default TVDetail;
