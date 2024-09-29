import React, { useState } from "react";
import "./Service.css";
const ServicePage = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", warranty: true },
    { id: 2, name: "Smartphone", warranty: false },
    { id: 3, name: "Washing Machine", warranty: true },
  ]); // Dummy product data
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [issue, setIssue] = useState("");
  const [message, setMessage] = useState("");
  const handleProductSelect = (product) => {
    if (product.warranty) {
      setSelectedProduct(product);
    } else {
      alert("This product is no longer under warranty.");
    }
  };
  const handleIssueSubmit = (e) => {
    e.preventDefault();
    setMessage("Your issue has been reported. We will resolve it soon.");
    setSelectedProduct(null); // Reset the selection
    setIssue(""); // Clear the issue form
  };
  return (
    <div className="service-page">
      <h1>Your Purchased Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-item" key={product.id}>
            <h3>{product.name}</h3>
            <p>Warranty: {product.warranty ? "Valid" : "Expired"}</p>
            <button onClick={() => handleProductSelect(product)}>
              Get Service
            </button>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="service-form">
          <h2>Report Issue for {selectedProduct.name}</h2>
          <form onSubmit={handleIssueSubmit}>
            <label>
              Describe your issue:
              <textarea
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                required
              />
            </label>
            <button type="submit">Submit Issue</button>
          </form>
        </div>
      )}
      {message && <p className="confirmation-message">{message}</p>}
    </div>
  );
};
export default ServicePage;
