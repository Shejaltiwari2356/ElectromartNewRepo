import React from "react";

const LaptopTable = ({ compareList, handleAddToCart, handleRemoveProduct }) => {
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
        <thead style={{ backgroundColor: "#f2f2f2", color: "#333333" }}>
          <tr>
            <th style={cellStyle}>Specification</th>
            {compareList.map((product) => (
              <th key={product._id} style={cellStyle}>
                <img
                  src={product.image} // Assuming the product object has an 'image' field
                  alt={product.name}
                  style={imageStyle}
                />
                <div style={{ marginTop: "10px" }}>{product.name}</div>
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
            <td style={cellStyle}>Brand</td>
            {compareList.map((product) => (
              <td key={product._id} style={cellStyle}>
                {product.brand}
              </td>
            ))}
          </tr>
          <tr>
            <td style={cellStyle}>Original Price</td>
            {compareList.map((product) => (
              <td key={product._id} style={cellStyle}>
                {product.originalprice}
              </td>
            ))}
          </tr>
          <tr>
            <td style={cellStyle}>Offer Price</td>
            {compareList.map((product) => (
              <td key={product._id} style={cellStyle}>
                {product.offerprice}
              </td>
            ))}
          </tr>
          <tr>
            <td style={cellStyle}>Discount</td>
            {compareList.map((product) => (
              <td key={product._id} style={cellStyle}>
                {product.discount}
              </td>
            ))}
          </tr>
          <tr>
            <td style={cellStyle}>Rating</td>
            {compareList.map((product) => (
              <td key={product._id} style={cellStyle}>
                {product.rating}
              </td>
            ))}
          </tr>
          <tr>
            <td style={cellStyle}>Screen Size</td>
            {compareList.map((product) => (
              <td key={product._id} style={cellStyle}>
                {product.screenSize}
              </td>
            ))}
          </tr>
          <tr>
            <td style={cellStyle}>Hard Disk Size</td>
            {compareList.map((product) => (
              <td key={product._id} style={cellStyle}>
                {product.hardDiskSize}
              </td>
            ))}
          </tr>
          <tr>
            <td style={cellStyle}>CPU Model</td>
            {compareList.map((product) => (
              <td key={product._id} style={cellStyle}>
                {product.cpuModel}
              </td>
            ))}
          </tr>
          <tr>
            <td style={cellStyle}>RAM Size</td>
            {compareList.map((product) => (
              <td key={product._id} style={cellStyle}>
                {product.ramMemoryInstalledSize}
              </td>
            ))}
          </tr>
          <tr>
            <td style={cellStyle}>Operating System</td>
            {compareList.map((product) => (
              <td key={product._id} style={cellStyle}>
                {product.operatingSystem}
              </td>
            ))}
          </tr>
          <tr>
            <td style={cellStyle}>Graphics Card</td>
            {compareList.map((product) => (
              <td key={product._id} style={cellStyle}>
                {product.graphicsCardDescription}
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
  border: "1px solid #ddd", // Add border to create lines in the table
  padding: "10px",
  textAlign: "center", // Center align the text
  fontSize: "14px",
};

const imageStyle = {
  width: "100px", // Set a fixed width for the product images
  height: "auto", // Maintain aspect ratio
  borderRadius: "5px",
};

const buttonStyle = (type) => ({
  marginTop: "10px",
  marginRight: "10px",
  backgroundColor: type === "remove" ? "#ff4d4d" : "#28a745",
  color: "white",
  border: "none",
  cursor: "pointer",
  padding: "5px 10px",
  borderRadius: "5px",
  transition: "background-color 0.3s ease",
});

export default LaptopTable;
