import React, { useState } from "react";
import spn1 from "../images/spn1.png";
import spn2 from "../images/spn2.png";
import spn3 from "../images/spn3.png";
import spn4 from "../images/spn4.png";

const images = [spn1, spn2, spn3, spn4];

const Slider2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to move to the previous set of images
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Function to move to the next set of images
  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-full mx-auto flex items-center justify-center overflow-hidden">
      {/* Left Arrow */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-3 text-xl hover:bg-gray-200 focus:outline-none z-10"
        onClick={prevImage}
      >
        &#8249; {/* Left arrow symbol */}
      </button>

      {/* Image Carousel */}
      <div className="flex gap-4 overflow-x-hidden w-full max-w-full">
        {images
          .slice(currentIndex, currentIndex + 3) // Showing a maximum of 3 images at once, adjust as per your need
          .map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Mobile product ${index + 1}`}
              className="w-1/3 object-cover rounded-lg shadow-lg"
            />
          ))}
      </div>

      {/* Right Arrow */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-3 text-xl hover:bg-gray-200 focus:outline-none z-10"
        onClick={nextImage}
      >
        &#8250; {/* Right arrow symbol */}
      </button>
    </div>
  );
};

export default Slider2;
