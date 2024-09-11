import React, { useState, useEffect } from "react";
import ProductDetail from "./ProductDetail";
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

  return (
    <div className="product-detail-page">
      {/* <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-detail-image"
        />
      </div> */}
      <div className="product-info-container">
        <ProductDetail {...product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
