import React, { useEffect, useState } from "react";
import "../style.css";

const Dashboard = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming JWT is stored here
        if (!token) {
          setError("You must be logged in to view devices.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:2402/api/devices", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch devices");
        }

        const data = await response.json();
        setDevices(data);
      } catch (err) {
        console.error("Error fetching devices:", err);
        setError("Unable to load devices.");
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  if (loading) return <p>Loading devices...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-container">
      <main className="dashboard-main">
        {devices.length === 0 ? (
          <p>No devices found.</p>
        ) : (
          devices.map((device) => (
            <a href={`/device/${device._id}`} className="card" key={device._id}>
              <p><strong>ID:</strong> {device.deviceId}</p>
              <p><strong>Company:</strong> {device.company}</p>
              <p><strong>Area:</strong> {device.area}</p>
              <p>
                <strong>Status:</strong>{" "}
                {device.lastMaintenanceDate
                  ? `Last working: ${new Date(device.lastMaintenanceDate).toLocaleString()}`
                  : "No data"}
              </p>
            </a>
          ))
        )}
      </main>
    </div>
  );
};

export default Dashboard;
