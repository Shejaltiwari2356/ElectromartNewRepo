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
      { value: "apple", label: "Apple" },
      { value: "lenovo", label: "Lenovo" },
      { value: "dell", label: "Dell" },
      { value: "hp", label: "HP" },
      // Add more brands as needed
    ],
  },
  {
    id: "offerprice",
    name: "Price Range",
    options: [
      { value: "low", label: "Under ₹40,000" },
      { value: "mid", label: "₹40,000 - ₹60,000" },
      { value: "high", label: "₹60,000 - ₹90,000" },
      { value: "premium", label: "₹90,000 & Above" },
    ],
  },
  {
    id: "cpuModel",
    name: "CPU Type",
    options: [
      { value: "core_m_family", label: "Core M Family" },
      { value: "ryzen_5", label: "Ryzen 5" },
      { value: "ryzen_7", label: "Ryzen 7" },
      { value: "core_i7", label: "Core i7" },
      { value: "core_i5", label: "Core i5" },
      { value: "core_i3", label: "Core i3" },
      { value: "intel_core_i7", label: "Intel core i7" },
      { value: "others", label: "Others" },
    ],
  },
  {
    id: "ramMemoryInstalledSize",
    name: "RAM Size",
    options: [
      { value: "4gb", label: "4GB" },
      { value: "8gb", label: "8GB" },
      { value: "16gb", label: "16GB" },
      { value: "32gb", label: "32GB" },
    ],
  },
  {
    id: "screenSize",
    name: "Laptop Display Size",
    options: [
      { value: "13", label: "13 inches" },
      { value: "15", label: "15 inches" },
      { value: "17", label: "17 inches" },
    ],
  },
  {
    id: "hardDiskSize",
    name: "HDD Size (ROM)",
    options: [
      { value: "256gb", label: "256GB" },
      { value: "512gb", label: "512GB" },
      { value: "1tb", label: "1TB" },
      { value: "2tb", label: "2TB" },
    ],
  },
  {
    id: "operatingSystem",
    name: "Operating System",
    options: [
      { value: "windows_11_home", label: "Windows 11 Home" },
      { value: "macos", label: "macOS" },
      { value: "linux", label: "Linux" },
    ],
  },
];

const LpSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    brand: new Set(),
    offerprice: new Set(),
    cpuModel: new Set(),
    ramMemoryInstalledSize: new Set(),
    screenSize: new Set(),
    hardDiskSize: new Set(),
    operatingSystem: new Set(),
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
    setActiveFilters((prev) => ({
      ...prev,
      [id]: prev[id].has(id)
        ? new Set([...prev[id]].filter((v) => v !== id))
        : new Set([...prev[id], id]),
    }));
  };

  // Handle filter checkbox change
  const handleFilterChange = (filterId, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterId]: prev[filterId].has(value)
        ? new Set([...prev[filterId]].filter((v) => v !== value))
        : new Set([...prev[filterId], value]),
    }));
  };

  // Apply filters to products
  const filteredProducts = products.filter((product) => {
    return Object.keys(activeFilters).every((filterId) => {
      if (activeFilters[filterId].size === 0) return true; // No filters applied for this type

      // Check if the product matches any of the selected filters
      switch (filterId) {
        case "brand":
          return activeFilters[filterId].has(product.brand);
        case "offerprice":
          return activeFilters[filterId].has(product.offerpriceRange); // Assuming you have a way to define this in your product
        case "cpuModel":
          return activeFilters[filterId].has(product.cpuModel);
        case "ramMemoryInstalledSize":
          return activeFilters[filterId].has(product.ram);
        case "screenSize":
          return activeFilters[filterId].has(product.screenSize);
        case "hardDiskSize":
          return activeFilters[filterId].has(product.hardDiskSize);
        case "operatingSystem":
          return activeFilters[filterId].has(product.operatingSystem);
        default:
          return true;
      }
    });
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
                  {activeFilters[filter.id].size > 0 ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>

                <div
                  className={`${
                    activeFilters[filter.id].size > 0 ? "block" : "hidden"
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

export default LpSearch;
