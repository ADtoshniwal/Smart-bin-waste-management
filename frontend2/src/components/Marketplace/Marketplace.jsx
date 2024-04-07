import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Marketplace() {
  // State to store marketplace items
  const [marketplaceItems, setMarketplaceItems] = useState([]);

  useEffect(() => {
    // Fetch marketplace items from the backend API
    async function fetchMarketplaceItems() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/visualizetion");
        setMarketplaceItems(response.data);
      } catch (error) {
        console.error("Error fetching marketplace items:", error);
      }
    }

    fetchMarketplaceItems();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <h1 className="text-3xl font-semibold mb-6">Explore Our Scrap Waste Marketplace</h1>
      <div className="flex flex-col gap-4">
        {marketplaceItems.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 flex">
            <div className="w-1/4 mr-4 flex justify-center items-center">
              <img
                src={item.image_url} // Use item.image_url directly
                alt={item.type}
                className="max-w-full h-auto rounded-md"
              />
            </div>

            <div className="w-2/3 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">{item.type}</h3>
                <p className="text-gray-600">
                  Recycled Tonnes: {item.recycled_tonned}
                </p>
                <p className="text-gray-600">
                  Generated Tonnes: {item.generated_tonned}
                </p>
                <p className="text-gray-600">Recycle Rate : {item.recyc_rate}</p>
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="name" className="sr-only">
                  Full Name 
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  className="input rounded-lg border border-gray-700 p-3 mt-2"
                />
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="input rounded-lg border border-gray-700 p-3 mt-2"
                />
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="tel" className="sr-only">
                  Telephone Number
                </label>
                <input
                  type="tel"
                  id="tel"
                  placeholder="Telephone Number"
                  className="input rounded-lg border border-gray-700 p-3 mt-2"
                />
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="query" className="sr-only">
                  Query
                </label>
                <textarea
                  id="query"
                  placeholder="Any queries"
                  className="input rounded-lg border border-gray-700 p-1 mt-1"
                  rows={4}
                />
              </div>
              <button
                type="submit"
                className="md:w-32 bg-green-900 hover:bg-blue-dark text-white font-bold py-3 px-6  mt-3 rounded-full hover:bg-green-500 transition ease-in-out duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
