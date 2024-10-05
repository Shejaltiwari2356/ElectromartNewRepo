import React from "react";
import ProductList from "./ProductList";
import img4 from "../images/img4.jpg";
import img5 from "../images/img5.png";
import img6 from "../images/img6.png";
import spn1 from "../images/spn1.png";
import spn2 from "../images/spn2.png";
import spn3 from "../images/spn3.png";
import spn4 from "../images/spn4.png";
import Slider2 from "./Slider2";

const Categories = () => {
  return (
    <div>
      <Slider2 />
      <h1>Mobiles</h1>
      <ProductList category="mobiles" limit={12} /> {/* Limit to 12 products */}
      <img src={img5} alt="Mobile products" /> {/* Correct img source */}
      <h1>Laptops</h1>
      <ProductList category="laptops" limit={6} /> {/* Limit to 6 products */}
      <img src={img6} alt="Mobile products" /> {/* Correct img source */}
      <h1>Televisions</h1>
      <ProductList category="tvs" /> {/* No limit defined, will show all */}
      <h1>ACs</h1>
      <ProductList category="acs" limit={12} /> {/* Limit to 12 products */}
      <img src={img4} alt="Mobile products" /> {/* Correct img source */}
      <h1>Washing Machines</h1>
      <ProductList category="washingmachines" />{" "}
      {/* No limit defined, will show all */}
    </div>
  );
};

export default Categories;
