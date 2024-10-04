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
      { value: "sony", label: "Sony" },
      { value: "ibell", label: "IBELL" },
      { value: "vu", label: "VU" },
      { value: "westinghouse", label: "Westinghouse" },
      { value: "toshiba", label: "Toshiba" },
      { value: "nu", label: "Nu" },
      { value: "panasonic", label: "Panasonic" },
      { value: "samsung", label: "Samsung" },
    ],
  },
  {
    id: "offerprice",
    name: "Price Range",
    options: [
      { value: "low", label: "Under ₹30,000" },
      { value: "mid", label: "₹30,000 - ₹40,000" },
      { value: "high", label: "₹40,000 - ₹60,000" },
      { value: "premium", label: "₹60,000 & Above" },
    ],
  },
  {
    id: "size",
    name: "Display Size",
    options: [
      { value: "32", label: "32 inches" },
      { value: "40", label: "40 inches" },
      { value: "50", label: "50 inches" },
      { value: "55", label: "55 inches" },
      { value: "65", label: "65 inches" },
      { value: "75", label: "75 inches" },
    ],
  },
  {
    id: "display_type",
    name: "Display Technology",
    options: [
      { value: "led", label: "LED" },
      { value: "oled", label: "OLED" },
      { value: "qled", label: "QLED" },
      { value: "lcd", label: "LCD" },
    ],
  },
  {
    id: "power_consumption",
    name: "Power Consumption",
    options: [
      { value: "80 watts", label: "80 watts" },
      { value: "95 watts", label: "95 watts" },
      { value: "100 watts", label: "100 watts" },
      { value: "150 watts", label: "150 watts" },
      { value: "220 watts", label: "220 watts" },
      { value: "dual", label: "Dual Voltage (110-220 watts)" },
    ],
  },
];

const TvSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    brand: new Set(),
    offerprice: new Set(),
    size: new Set(),
    display_type: new Set(),
    power_consumption: new Set(),
  });
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

  // Toggle filter visibility
  const toggleFilter = (id) => {
    setActiveFilters((prev) => {
      const updatedFilters = { ...prev };
      if (updatedFilters[id].size) {
        delete updatedFilters[id];
      } else {
        updatedFilters[id] = new Set();
      }
      return updatedFilters;
    });
  };

  // Handle filter change
  const handleFilterChange = (filterId, optionValue) => {
    setActiveFilters((prev) => {
      const updatedFilters = { ...prev };
      if (updatedFilters[filterId].has(optionValue)) {
        updatedFilters[filterId].delete(optionValue);
      } else {
        updatedFilters[filterId].add(optionValue);
      }
      return updatedFilters;
    });
  };

  // Filter products based on active filters
  const filteredProducts = products.filter((product) => {
    for (const filterId in activeFilters) {
      if (activeFilters[filterId].size > 0) {
        // Check if product matches any active filter
        if (!activeFilters[filterId].has(product[filterId])) {
          return false;
        }
      }
    }
    return true;
  });

  return (
    <section className="w-full min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-10">
        {/* Header */}
        <div className="flex justify-between items-center pb-6">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Products
          </h1>
        </div>

        {/* Filters & Products */}
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
                  {activeFilters[filter.id].size ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>

                <div
                  className={`${
                    activeFilters[filter.id].size ? "block" : "hidden"
                  } mt-4`}
                >
                  <ul className="space-y-3">
                    {filter.options.map((option) => (
                      <li key={option.value} className="flex items-center">
                        <input
                          id={`${filter.id}-${option.value}`}
                          name={`${filter.id}[]`}
                          value={option.value}
                          type="checkbox"
                          checked={activeFilters[filter.id].has(option.value)}
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
                {filteredProducts.length > 0 ? (
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

export default TvSearch;
