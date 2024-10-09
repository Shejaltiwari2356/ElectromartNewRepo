import React from "react";

const ACTable = ({ compareList, handleAddToCart, handleRemoveProduct }) => {
  return (
    <div
      style={{
        overflowX: "auto",
        marginTop: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <thead style={{ backgroundColor: "#f2f2f2", color: "#000" }}>
          <tr>
            <th style={cellStyle}>Specification</th>
            {compareList.map((product) => (
              <th key={product._id} style={cellStyle}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100px", height: "auto" }} // Adjust size as needed
                />
                <div style={{ marginTop: "5px" }}>{product.name}</div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>
                  <button
                    onClick={() => handleRemoveProduct(product._id)}
                    style={buttonStyle("remove")}
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    style={buttonStyle("add")}
                  >
                    Add to Cart
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { label: "Brand", key: "brand" },
            { label: "Original Price", key: "originalprice" },
            { label: "Offer Price", key: "offerprice" },
            { label: "Discount", key: "discount" },
            { label: "Rating", key: "rating" },
            { label: "Capacity", key: "capacityAC" },
            { label: "Energy Rating", key: "energy_rating" },
            { label: "Type", key: "type" },
          ].map((spec) => (
            <tr key={spec.label}>
              <td style={cellStyle}>{spec.label}</td>
              {compareList.map((product) => (
                <td key={product._id} style={cellStyle}>{product[spec.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Styles
const cellStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center",
  fontSize: "14px",
};

const buttonStyle = (type) => ({
  marginTop: "10px",
  marginRight: "10px", 
  backgroundColor: type === "remove" ? "#ff4d4d" : "#4CAF50", 
  color: "white",
  border: "none",
  cursor: "pointer",
  padding: "5px 10px",
  borderRadius: "5px",
  transition: "background-color 0.3s ease",
});

export default ACTable;
