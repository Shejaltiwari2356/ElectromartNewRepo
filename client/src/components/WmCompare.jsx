import React from "react";

const WashingMachineTable = ({
  compareList,
  handleAddToCart,
  handleRemoveProduct,
}) => {
  return (
    <table
      style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
    >
      <thead style={{ backgroundColor: "#f2f2f2" }}>
        <tr>
          <th style={cellStyle}>Image</th>
          <th style={cellStyle}>Specification</th>
          {compareList.map((product) => (
            <th key={product._id} style={cellStyle}>
              {product.name}
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
          <td colSpan={1}></td> {/* Empty cell for header alignment */}
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
          <td>Capacity</td>
          {compareList.map((product) => (
            <td key={product._id}>{product.capacity}</td>
          ))}
        </tr>
        <tr>
          <td colSpan={1}></td>
          <td>Color</td>
          {compareList.map((product) => (
            <td key={product._id}>{product.color}</td>
          ))}
        </tr>
        <tr>
          <td colSpan={1}></td>
          <td>Special Features</td>
          {compareList.map((product) => (
            <td key={product._id}>{product.specialFeature}</td>
          ))}
        </tr>
        <tr>
          <td colSpan={1}></td>
          <td>Maximum Rotational Speed</td>
          {compareList.map((product) => (
            <td key={product._id}>{product.maximumRotationalSpeed}</td>
          ))}
        </tr>
        <tr>
          <td colSpan={1}></td>
          <td>Access Location</td>
          {compareList.map((product) => (
            <td key={product._id}>{product.accessLocation}</td>
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
  );
};

const cellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
};

export default WashingMachineTable;
