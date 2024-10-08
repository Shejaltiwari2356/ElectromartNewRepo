import React from "react";

const MobileTable = ({ compareList, handleRemoveProduct, handleAddToCart }) => {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
      }}
    >
      <thead style={{ backgroundColor: "#f2f2f2" }}>
        <tr>
          <th
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              textAlign: "left",
            }}
          >
            Specification
          </th>
          {compareList.map((product) => (
            <th
              key={product._id}
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
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
        {/* Specification rows */}
        <tr>
          <td style={cellStyle}>Name</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>
              {product.name}
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
          <td style={cellStyle}>Bought</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>
              {product.bought}
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
          <td style={cellStyle}>Original Price</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>
              {product.originalprice}
            </td>
          ))}
        </tr>
        <tr>
          <td style={cellStyle}>Brand</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>
              {product.brand}
            </td>
          ))}
        </tr>
        <tr>
          <td style={cellStyle}>Cellular Technology</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>
              {product.cellulartechnology}
            </td>
          ))}
        </tr>
        <tr>
          <td style={cellStyle}>Operating System</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>
              {product.os}
            </td>
          ))}
        </tr>
        <tr>
          <td style={cellStyle}>Display</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>
              {product.display}
            </td>
          ))}
        </tr>
        <tr>
          <td style={cellStyle}>RAM</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>
              {product.ram}
            </td>
          ))}
        </tr>
        <tr>
          <td style={cellStyle}>ROM</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>
              {product.rom}
            </td>
          ))}
        </tr>
        <tr>
          <td style={cellStyle}>Processor Speed</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>
              {product.processorspeed}
            </td>
          ))}
        </tr>
        <tr>
          <td style={cellStyle}>Battery</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>
              {product.battery} mAh
            </td>
          ))}
        </tr>
        <tr>
          <td style={cellStyle}>Camera (Front)</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>
              {product.frontcamera} MP
            </td>
          ))}
        </tr>
        <tr>
          <td style={cellStyle}>Camera (Rear)</td>
          {compareList.map((product) => (
            <td key={product._id} style={cellStyle}>
              {product.rearcamera} MP
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

const cellStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center",
};

export default MobileTable;
