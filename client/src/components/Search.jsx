import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp, Loader } from "lucide-react";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const filters = [
  {
    id: "brand",
    name: "Brand",
    options: [
      { value: "iqoo", label: "IQOO" },
      { value: "samsung", label: "Samsung" },
      { value: "vivo", label: "Vivo" },
      { value: "realme", label: "Realme" },
      { value: "readmi", label: "Readmi" },
      { value: "oneplus", label: "OnePlus" },
      { value: "techno", label: "Techno" },
      { value: "poco", label: "Poco" },
      { value: "apple", label: "Apple" },
      { value: "motorola", label: "Motorola" },
      { value: "lava", label: "Lava" },
    ],
  },
  {
    id: "price",
    name: "Price",
    options: [
      { value: "low", label: "Under ₹15,000" },
      { value: "mid", label: "₹15,000 - ₹30,000" },
      { value: "high", label: "₹30,000 - ₹60,000" },
      { value: "premium", label: "₹60,000 & Above" },
    ],
  },
  {
    id: "os",
    name: "Operating System",
    options: [
      { value: "android10", label: "Android 10.0" },
      { value: "android11", label: "Android 11.0" },
      { value: "android12", label: "Android 12.0" },
      { value: "android13", label: "Android 13.0" },
      { value: "android14", label: "Android 14.0" },
      { value: "ios14", label: "iOS 14" },
      { value: "ios9", label: "iOS" },
    ],
  },
  // Add more filters as needed
  {
    id: "ram",
    name: "RAM",
    options: [
      { value: "1gb", label: "Up to 1.9 GB" },
      { value: "2gb", label: "2 to 3.9 GB" },
      { value: "4gb", label: "4 to 5.9 GB" },
      { value: "6gb", label: "6 to 7.9 GB" },
      { value: "8gb", label: "8 to 9.9 GB" },
      { value: "10gb", label: "10 GB & Above" },
    ],
  },
  {
    id: "rom",
    name: "ROM",
    options: [
      { value: "4gb", label: "Up to 4 GB" },
      { value: "8gb", label: "8 GB" },
      { value: "16gb", label: "16 GB" },
      { value: "32gb", label: "32 GB" },
      { value: "64gb", label: "64 GB" },
      { value: "128gb", label: "128 GB" },
      { value: "256gb", label: "256 GB" },
      { value: "512gb", label: "512 GB & above" },
    ],
  },
  {
    id: "battery",
    name: "Battery",
    options: [
      { value: "3000mah", label: "Up to 2,999 mAh" },
      { value: "5000mah", label: "3,000 to 4,999 mAh" },
      { value: "6000mah", label: "5,000 to 5,999 mAh" },
      { value: "6000mah+", label: "6,000 mAh & above" },
    ],
  },
  {
    id: "display",
    name: "Display",
    options: [
      { value: "amoled", label: "AMOLED" },
      { value: "lcd", label: "LCD" },
      { value: "oled", label: "OLED" },
    ],
  },
];

const Search = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({}); // Manage active filters
  const query = useQuery().get("q");

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5001/api/auth/search?q=${query}`
        );
        setProducts(response.data);
      } catch (error) {
        setError("Failed to fetch search results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  const handleFilterChange = (filterId, optionValue) => {
    setActiveFilters((prevFilters) => {
      const currentValues = prevFilters[filterId] || new Set();
      if (currentValues.has(optionValue)) {
        currentValues.delete(optionValue); // Remove if already present
      } else {
        currentValues.add(optionValue); // Add if not present
      }
      return {
        ...prevFilters,
        [filterId]: currentValues,
      };
    });
  };

  const filteredProducts = products.filter((product) => {
    return Object.keys(activeFilters).every((filterId) => {
      const filterValues = activeFilters[filterId];
      return filterValues ? filterValues.has(product[filterId]) : true;
    });
  });

  const toggleFilter = (id) => {
    setActiveFilters((prev) => {
      if (prev[id]) {
        const newFilters = { ...prev };
        delete newFilters[id]; // Remove filter
        return newFilters;
      } else {
        return { ...prev, [id]: new Set() }; // Add new filter
      }
    });
  };

  return (
    <section className="w-full min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-10">
        <div className="flex justify-between items-center pb-6">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Products
          </h1>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Sidebar (Filters) */}
          <aside className="lg:col-span-3 space-y-4">
            {filters.map((filter) => (
              <div
                key={filter.id}
                className="bg-white rounded-lg shadow-lg p-4"
              >
                <button
                  onClick={() => toggleFilter(filter.id)}
                  className="flex justify-between w-full items-center text-lg font-semibold text-gray-800"
                >
                  {filter.name}
                  {activeFilters[filter.id] ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>

                <div
                  className={`${
                    activeFilters[filter.id] ? "block" : "hidden"
                  } mt-4`}
                >
                  <ul className="space-y-3">
                    {filter.options.map((option) => (
                      <li key={option.value} className="flex items-center">
                        <input
                          id={`${filter.id}-${option.value}`}
                          value={option.value}
                          type="checkbox"
                          checked={
                            activeFilters[filter.id]?.has(option.value) || false
                          }
                          onChange={() =>
                            handleFilterChange(filter.id, option.value)
                          }
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`${filter.id}-${option.value}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </aside>

          {/* Products */}
          <div className="lg:col-span-9">
            {loading ? (
              <div className="flex justify-center items-center h-80">
                <Loader className="animate-spin h-12 w-12 text-indigo-600" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                {error && (
                  <div className="col-span-full text-center text-red-600 font-semibold">
                    {error}
                  </div>
                )}
                {Array.isArray(filteredProducts) &&
                filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Link
                      to={`/products/${product._id}`}
                      key={product._id}
                      className="group block bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105"
                    >
                      <div className="relative overflow-hidden">
                        <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
                          New Launch
                        </div>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-60 w-full object-cover rounded-t-lg"
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition">
                          {product.name}
                        </h2>
                        <div className="mt-2 text-2xl font-bold text-indigo-600">
                          {product.offerprice}
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            {product.originalprice}
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-green-500 font-semibold">
                          {product.discount} off
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-500">
                    No results found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
