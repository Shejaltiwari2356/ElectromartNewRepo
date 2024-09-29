import React, { useState, useEffect } from "react";
import MobileDetail from "./MobileDetail";
import WashingMachineDetail from "./WashingMachineDetail";
import LaptopDetail from "./LaptopDetail"; // Import LaptopDetail
import ACDetail from "./AcDetail"; // Import ACDetail
import TVDetail from "./TVDetail"; // Import TVDetail
import { useParams } from "react-router-dom";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams(); // Extract product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!product) return <p>No product found</p>;

  const renderProductDetail = () => {
    switch (product.category) {
      case "mobiles":
        return <MobileDetail {...product} />;
      case "washingmachines":
        return <WashingMachineDetail {...product} />;
      case "laptops": // Case for laptops
        return <LaptopDetail {...product} />;
      case "acs": // Case for ACs
        return <ACDetail {...product} />;
      case "tvs": // Added case for TVs
        return <TVDetail {...product} />;
      // Add more cases for additional categories as needed
      default:
        return <p>Product category not supported.</p>;
    }
  };

  return (
    <div className="product-detail-page">
      <div className="product-info-container">{renderProductDetail()}</div>
    </div>
  );
};

export default ProductDetailPage;
