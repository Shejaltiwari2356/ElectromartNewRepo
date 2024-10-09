import React from "react";

const WashingMachineTable = ({
  compareList,
  handleAddToCart,
  handleRemoveProduct,
}) => {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
        border: "1px solid #ddd", // Add border to the table
      }}
    >
      <thead style={{ backgroundColor: "#f2f2f2" }}>
        <tr>
          <th style={cellStyle}>Specification</th>
          {compareList.map((product) => (
            <th key={product._id} style={cellStyle}>
              <img
                src={product.image} // Assuming the product object has an 'image' field
                alt={product.name}
                style={{ width: "100px", height: "auto" }} // Adjust size as needed
              />
              <div>{product.name}</div>
              <div>
                <button
                  onClick={() => handleRemoveProduct(product._id)}
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    padding: "5px 10px",
                    borderRadius: "5px",
                  }}
                >
                  Remove
                </button>
                <button
                  onClick={() => handleAddToCart(product._id)}
                  style={{
                    marginLeft: "10px",
                    marginTop: "10px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    padding: "5px 10px",
                    borderRadius: "5px",
                  }}
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
            <td key={product._id} style={cellStyle}>{product.brand}</td>
          ))}
        </tr>
        <tr>
          <td style={cellStyle}>Original Price</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>{product.originalprice}</td>
          ))}
        </tr>
        <tr>
          <td style={cellStyle}>Offer Price</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>{product.offerprice}</td>
          ))}
        </tr>
        <tr>
          <td style={cellStyle}>Discount</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>{product.discount}</td>
          ))}
        </tr>
        <tr>
          <td style={cellStyle}>Rating</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>{product.rating}</td>
          ))}
        </tr>
        <tr>
          <td style={cellStyle}>Capacity</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>{product.capacity}</td>
          ))}
        </tr>
        <tr>
          <td style={cellStyle}>Color</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>{product.color}</td>
          ))}
        </tr>
        <tr>
          <td style={cellStyle}>Special Features</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>{product.specialFeatures}</td>
          ))}
        </tr>
        <tr>
          <td style={cellStyle}>Maximum Rotational Speed</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>{product.maximumRotationalSpeed}</td>
          ))}
        </tr>
        <tr>
          <td style={cellStyle}>Access Location</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>{product.accessLocation}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

const cellStyle = {
  border: "1px solid #ddd", // Border for each cell
  padding: "8px",
  textAlign: "center", // Center align text
};

export default WashingMachineTable;
