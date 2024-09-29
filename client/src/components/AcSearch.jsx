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
      { value: "llyod", label: "Llyod" },
      { value: "cruise", label: "Cruise" },
      { value: "lg", label: "LG" },
      { value: "panasonic", label: "Panasonic" },
      { value: "daikin", label: "Daikin" },
      { value: "carrier", label: "Carrier" },
      // Add more brands as needed
    ],
  },
  {
    id: "offerprice",
    name: "Price Range",
    options: [
      { value: "low", label: "Under ₹35,000" },
      { value: "mid", label: "₹35,000 - ₹50,000" },
      { value: "high", label: "₹50,000 - ₹65,000" },
      { value: "premium", label: "₹65,000 & Above" },
    ],
  },
  {
    id: "capacity",
    name: "Air Conditioner Capacity",
    options: [
      { value: "1ton", label: "Up to 1 Ton" },
      { value: "1.5ton", label: "1 - 1.5 Tons" },
      { value: "2ton", label: "1.5 - 2 Tons" },
      { value: "above_2ton", label: "Above 2 Tons" },
    ],
  },
  {
    id: "energy_rating",
    name: "Energy Star Rating",
    options: [
      { value: "3star", label: "3 Star" },
      { value: "4star", label: "4 Star" },
      { value: "5star", label: "5 Star" },
    ],
  },
  {
    id: "type",
    name: "AC Type",
    options: [
      { value: "split", label: "Split" },
      { value: "window", label: "Window" },
    ],
  },
];

const AcSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]); // Changed to array
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
    setActiveFilters((prev) =>
      prev.includes(id)
        ? prev.filter((filterId) => filterId !== id)
        : [...prev, id]
    );
  };

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
                  {activeFilters.includes(filter.id) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>

                <div
                  className={`${
                    activeFilters.includes(filter.id) ? "block" : "hidden"
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
                {Array.isArray(products) && products.length > 0 ? (
                  products.map((product) => (
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

export default AcSearch;
