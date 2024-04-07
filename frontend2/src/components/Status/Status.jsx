import React, { useState, useEffect } from "react";

function ProgressBar({ value, max }) {
  const [progress, setProgress] = useState((value / max) * 100);

  useEffect(() => {
    setProgress((value / max) * 100); 
  }, [value, max]);

  return (
    <div className="h-4 bg-gray-200 rounded-full mb-4">
      <div
        className="h-full bg-green-500 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default function Status() {
  const [orgData, setOrgData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/status");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setOrgData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleRefreshStatus = () => {
    setLoading(true);
    fetchData();
    window.location.reload(); 
  };

  return (
    <div>
      <div className="flex justify-center items-center mb-4">
        <button
          onClick={handleRefreshStatus}
          className="bg-blue-900 hover:bg-blue-600 mt-4  text-white font-bold py-2 px-4 rounded-full "
        >
          Refresh Status
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : orgData ? (
        <div className="">
          {orgData.map((org, index) => (
            <div key={index} className="mx-auto mb-6">
              <div className="bg-white shadow-md text-gray-700 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {org.org_name}
                </h2>
                <p>
                  <strong>Name:</strong> {org.org_repr_detail.name}
                </p>
                <p>
                  <strong>Email:</strong> {org.org_repr_detail.email}
                </p>
                <p>
                  <strong>Contact No:</strong> {org.org_repr_detail.contact_no}
                </p>
                <div className="mt-4">
                  <div className="mb-5">
                    <p>
                      Filled Wet Bins: {org.filled_wet_bins}/{org.tot_wet_bins}
                    </p>
                    <ProgressBar
                      value={org.tot_wet_bins === 0 ? 0 : org.filled_wet_bins}
                      max={org.tot_wet_bins}
                    />

                  </div>
                  <div>
                    <p>
                      Filled Dry Bins: {org.filled_dry_bins}/{org.tot_dry_bins}
                    </p>
                    <ProgressBar
                      value={org.filled_dry_bins}
                      max={org.tot_dry_bins}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
