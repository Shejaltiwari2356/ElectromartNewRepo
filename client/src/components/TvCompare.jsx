import React from "react";

const TvTable = ({ compareList, handleAddToCart, handleRemoveProduct }) => {
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
        <thead style={{ backgroundColor: "#007bff", color: "#ffffff" }}>
          <tr>
            <th style={cellStyle}>Image</th>
            <th style={cellStyle}>Specification</th>
            {compareList.map((product) => (
              <th key={product._id} style={cellStyle}>
                {product.name}
                <div>
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
          <tr>
            <td colSpan={1}></td>
            <td>Brand</td>
            {compareList.map((product) => (
              <td key={product._id}>{product.brand}</td>
            ))}
          </tr>
          <tr>
            <td colSpan={1}></td>
            <td>Original Price</td>
            {compareList.map((product) => (
              <td key={product._id}>{product.originalprice}</td>
            ))}
          </tr>
          <tr>
            <td colSpan={1}></td>
            <td>Offer Price</td>
            {compareList.map((product) => (
              <td key={product._id}>{product.offerprice}</td>
            ))}
          </tr>
          <tr>
            <td colSpan={1}></td>
            <td>Discount</td>
            {compareList.map((product) => (
              <td key={product._id}>{product.discount}</td>
            ))}
          </tr>
          <tr>
            <td colSpan={1}></td>
            <td>Rating</td>
            {compareList.map((product) => (
              <td key={product._id}>{product.rating}</td>
            ))}
          </tr>
          <tr>
            <td colSpan={1}></td>
            <td>Size</td>
            {compareList.map((product) => (
              <td key={product._id}>{product.size}</td>
            ))}
          </tr>
          <tr>
            <td colSpan={1}></td>
            <td>Resolution</td>
            {compareList.map((product) => (
              <td key={product._id}>{product.resolution}</td>
            ))}
          </tr>
          <tr>
            <td colSpan={1}></td>
            <td>Display Type</td>
            {compareList.map((product) => (
              <td key={product._id}>{product.display_type}</td>
            ))}
          </tr>
          <tr>
            <td colSpan={1}></td>
            <td>Speaker Power</td>
            {compareList.map((product) => (
              <td key={product._id}>{product.speaker_power}</td>
            ))}
          </tr>
          <tr>
            <td colSpan={1}></td>
            <td>Voltage</td>
            {compareList.map((product) => (
              <td key={product._id}>{product.voltage}</td>
            ))}
          </tr>
          <tr>
            <td colSpan={1}></td>
            <td>HDMI Ports</td>
            {compareList.map((product) => (
              <td key={product._id}>{product.hdmi_ports}</td>
            ))}
          </tr>
          <tr>
            <td colSpan={1}></td>
            <td>Image</td>
            {compareList.map((product) => (
              <td key={product._id} style={{ textAlign: "center" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100px", height: "auto" }} // Adjust size as needed
                />
              </td>
            ))}
          </tr>
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
  backgroundColor: type === "remove" ? "#ff4d4d" : "#28a745",
  color: "white",
  border: "none",
  cursor: "pointer",
  padding: "5px 10px",
  borderRadius: "5px",
  transition: "background-color 0.3s ease",
});

export default TvTable;
