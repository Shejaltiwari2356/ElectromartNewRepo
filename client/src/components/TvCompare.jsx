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
        <thead style={{ backgroundColor: "#f2f2f2", color: "#333333" }}>
          <tr>
            <th style={cellStyle}>Specification</th>
            {compareList.map((product) => (
              <th key={product._id} style={cellStyle}>
                <img
                  src={product.image} 
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
            <td style={cellStyle}>Size</td>
            {compareList.map((product) => (
              <td key={product._id} style={cellStyle}>
                {product.size}
              </td>
            ))}
          </tr>
          <tr>
            <td style={cellStyle}>Resolution</td>
            {compareList.map((product) => (
              <td key={product._id} style={cellStyle}>
                {product.resolution}
              </td>
            ))}
          </tr>
          <tr>
            <td style={cellStyle}>Display Type</td>
            {compareList.map((product) => (
              <td key={product._id} style={cellStyle}>
                {product.display_type}
              </td>
            ))}
          </tr>
          <tr>
            <td style={cellStyle}>Speaker Power</td>
            {compareList.map((product) => (
              <td key={product._id} style={cellStyle}>
                {product.speaker_power}
              </td>
            ))}
          </tr>
          <tr>
            <td style={cellStyle}>Voltage</td>
            {compareList.map((product) => (
              <td key={product._id} style={cellStyle}>
                {product.voltage}
              </td>
            ))}
          </tr>
          <tr>
            <td style={cellStyle}>HDMI Ports</td>
            {compareList.map((product) => (
              <td key={product._id} style={cellStyle}>
                {product.hdmi_ports}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const cellStyle = {
  border: "1px solid #ddd", 
  padding: "10px",
  textAlign: "center", 
  fontSize: "14px",
};

const imageStyle = {
  width: "100px", 
  height: "auto", 
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

export default TvTable;
