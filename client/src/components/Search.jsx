import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import "./Search.css"

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const filters = [
  {
    id: "brand",
    name: "Brand",
    options: [
      { value: "white", label: "Samsung" },
      { value: "beige", label: "Realme" },
      { value: "blue", label: "Readmi" },
      { value: "brown", label: "OnePlus" },
      { value: "green", label: "iPhone" },
      { value: "purple", label: "Motorola" },
    ],
  },
  {
    id: "price",
    name: "Price",
    options: [
      { value: "new-arrivals", label: "All New Arrivals" },
      { value: "tees", label: "Tees" },
      { value: "crewnecks", label: "Crewnecks" },
      { value: "sweatshirts", label: "Sweatshirts" },
      { value: "pants-shorts", label: "Pants & Shorts" },
    ],
  },
  {
    id: "Operating System",
    name: "Operating System",
    options: [
      { value: "xs", label: "Android 10.0" },
      { value: "s", label: "Android 11.0" },
      { value: "m", label: "Android 12.0" },
      { value: "l", label: "Android 13.0" },
      { value: "xl", label: "iOS 8" },
      { value: "2xl", label: "iOS 9" },
    ],
  },
  {
    id: "Primary Camera",
    name: "Primary Camera",
    options: [
      { value: "xs", label: "4-7.9 MP" },
      { value: "s", label: "8-11.9 MP" },
      { value: "m", label: "12-15.9 MP" },
      { value: "l", label: "16 - 19.9 MP" },
      { value: "xl", label: "20 - 23.9 MP" },
      { value: "2xl", label: "32 & Above" },
      
    ],
  },
  {
    id: "RAM Size",
    name: "RAM Size",
    options: [
      { value: "xs", label: "Up to 1.9 GB" },
      { value: "s", label: "2 to 3.9 GB" },
      { value: "m", label: "4 to 5.9 GB" },
      { value: "l", label: "6 to 7.9 GB" },
      { value: "xl", label: "8 to 9.9 GB" },
      { value: "2xl", label: "10 GB & Above" },
      
    ],
  },
  {
    id: "ROM Size",
    name: "ROM Size",
    options: [
      { value: "xs", label: "Up to 3.9 GB" },
      { value: "s", label: "4 GB" },
      { value: "m", label: "8 GB" },
      { value: "l", label: "16 GB" },
      { value: "xl", label: "32 GB" },
      { value: "2xl", label: "64 GB" },
      { value: "2xl", label: "128 GB" },
      { value: "2xl", label: "256 GB" },
      { value: "2xl", label: "512 GB & above" },
      
      
    ],
  },
  {
    id: "Battery",
    name: "Battery",
    options: [
      { value: "xs", label: "Up to 2,999 mAh" },
      { value: "s", label: "3,000 to 4,999 mAh" },
      { value: "m", label: "5,000 to 5,999 mAh" },
      { value: "l", label: "6,000 mAh & above" },
  
    ],
  },
  {
    id: "Display Type",
    name: "Display Type",
    options: [
      { value: "xs", label: "AMOLED" },
      { value: "s", label: "LCD" },
      { value: "m", label: "OLED" },
    ],
  },
];

const Search = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const query = useQuery().get("q");
  console.log("Query parameter:", query);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/auth/search?q=${query}`
        );
        console.log("Response data:", response.data); // Inspect the response data
        setProducts(response.data); // Assuming the response.data is an array of products
      } catch (error) {
        console.error("Error fetching search results", error);
        setError("Failed to fetch search results. Please try again.");
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  console.log("Products state:", products);
  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-2 py-10 lg:px-10">
        {/* Top */}
        <div className="md:flex md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-xl font-bold">Products</h1>
          </div>
          
        </div>
        <hr className="my-8" />
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
          <div className="hidden space-y-6 divide-y lg:col-span-3 lg:block">
            {filters.map((filter) => (
              <div key={filter.id} className="pt-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {filter.name}
                </h3>
                <ul className="mt-2">
                  {filter.options.map((option) => (
                    <li
                      key={option.value}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center">
                        <input
                          id={`${filter.id}-${option.value}`}
                          name={`${filter.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <label
                          htmlFor={`${filter.id}-${option.value}`}
                          className="ml-3 text-sm font-medium text-gray-900"
                        >
                          {option.label}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="h-[400px] w-full rounded-lg border-2 border-dashed px-2 lg:col-span-9 lg:h-full">
            <div className="product-list">
              {error && <p className="error-message">{error}</p>}
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                  <div className="product-card" key={product._id}>
                    <Link
                      to={`/products/${product._id}`}
                      className="product-link"
                    >
                      <div className="badge">New Launch</div>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />
                      <h2 className="product-name">{product.name}</h2>
                      <div className="price">
                        {product.offerprice}{" "}
                        <span className="original-price">
                          {product.originalprice}
                        </span>{" "}
                        <span className="discount">{product.discount} off</span>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p>No results found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
