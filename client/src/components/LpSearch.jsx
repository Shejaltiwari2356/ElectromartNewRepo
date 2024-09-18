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
        { value: "dell", label: "Dell" },
        { value: "hp", label: "HP" },
        { value: "apple", label: "Apple" },
        { value: "lenovo", label: "Lenovo" },
        { value: "asus", label: "Asus" },
        // Add more brands as needed
      ],
    },
    {
      id: "price",
      name: "Price Range",
      options: [
        { value: "low", label: "Under $500" },
        { value: "mid", label: "$500 - $1000" },
        { value: "high", label: "$1000 - $1500" },
        { value: "premium", label: "$1500 & Above" },
      ],
    },
    {
      id: "cpu_type",
      name: "CPU Type",
      options: [
        { value: "intel", label: "Intel" },
        { value: "amd", label: "AMD" },
      ],
    },
    {
      id: "ram_size",
      name: "RAM Size",
      options: [
        { value: "4gb", label: "4GB" },
        { value: "8gb", label: "8GB" },
        { value: "16gb", label: "16GB" },
        { value: "32gb", label: "32GB" },
      ],
    },
    {
      id: "display_size",
      name: "Laptop Display Size",
      options: [
        { value: "13", label: "13 inches" },
        { value: "15", label: "15 inches" },
        { value: "17", label: "17 inches" },
      ],
    },
    {
      id: "hdd_size",
      name: "HDD Size (ROM)",
      options: [
        { value: "256gb", label: "256GB" },
        { value: "512gb", label: "512GB" },
        { value: "1tb", label: "1TB" },
        { value: "2tb", label: "2TB" },
      ],
    },
    {
      id: "operating_system",
      name: "Operating System",
      options: [
        { value: "windows", label: "Windows" },
        { value: "macos", label: "macOS" },
        { value: "linux", label: "Linux" },
      ],
    },
    {
      id: "display_type",
      name: "Display Type",
      options: [
        { value: "led", label: "LED" },
        { value: "ips", label: "IPS" },
        { value: "oled", label: "OLED" },
      ],
    },
    {
      id: "cpu_speed",
      name: "CPU Processor Speed",
      options: [
        { value: "2ghz", label: "Up to 2 GHz" },
        { value: "3ghz", label: "2 - 3 GHz" },
        { value: "4ghz", label: "Above 3 GHz" },
      ],
    },
    {
      id: "graphics_memory",
      name: "Graphics Memory",
      options: [
        { value: "2gb", label: "2GB" },
        { value: "4gb", label: "4GB" },
        { value: "6gb", label: "6GB" },
        { value: "8gb", label: "8GB" },
      ],
    },
    {
      id: "battery_life",
      name: "Battery Life",
      options: [
        { value: "up_to_5h", label: "Up to 5 hours" },
        { value: "5_to_10h", label: "5 to 10 hours" },
        { value: "above_10h", label: "Above 10 hours" },
      ],
    },
  ];
  

const Search = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
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
    setActiveFilter(activeFilter === id ? null : id);
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
              <div key={filter.id} className="bg-white rounded-lg shadow-lg p-4">
                <button
                  onClick={() => toggleFilter(filter.id)}
                  className="flex justify-between w-full items-center text-lg font-semibold text-gray-800"
                >
                  {filter.name}
                  {activeFilter === filter.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>

                <div className={`${activeFilter === filter.id ? "block" : "hidden"} mt-4`}>
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

export default LpSearch;
