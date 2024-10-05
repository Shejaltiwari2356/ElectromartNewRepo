import React from "react";
import ProductList from "./ProductList";

const Categories = () => {
  return (
    <div>
      <h1>Mobiles</h1>
      <ProductList category="mobiles" limit={12} /> {/* Limit to 14 products */}
      <h1>Laptops</h1>
      <ProductList category="laptops" limit={6} /> {/* Limit to 6 products */}
      <h1>Televisions</h1>
      <ProductList category="tvs" /> {/* No limit defined, will show all */}
      <h1>ACs</h1>
      <ProductList category="acs" limit={12} /> {/* Limit to 12 products */}
      <h1>Washing Machines</h1>
      <ProductList category="washingmachines" />{" "}
      {/* No limit defined, will show all */}
    </div>
  );
};

export default Categories;
