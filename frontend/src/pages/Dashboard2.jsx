import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style.css";

const Dashboard2 = () => {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [latestReadings, setLatestReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view device details.");
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:2402/api/devices/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch device details");

        const data = await response.json();
        setDevice(data.device);
        setLatestReadings(data.latestReadings);
      } catch (err) {
        console.error("Error fetching device:", err);
        setError("Unable to load device details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDevice();
  }, [id]);

  if (loading) return <p>Loading device details...</p>;
  if (error) return <p>{error}</p>;
  if (!device) return <p>No device found.</p>;

  return (
    <div className="dashboard2-container">
      <nav className="dashboard2-navbar">
        <a href="/dashboard">
          {/* <img src="/images/Final_logo.png" alt="Logo" /> */}
        </a>
        <ul>
          <li><a href="#" className="dashboard2-btn">Maintenance History</a></li>
          <li><a href="#" className="dashboard2-btn">Edit Profile</a></li>
        </ul>
      </nav>

      <main>
        {/* Device Info */}
        <div className="dashboard2-card">
          <h2>ID: {device.deviceId}</h2>
          <p>
            Company: {device.company}<br />
            Area: {device.area}<br />
            GPS: {device.gps.lat}, {device.gps.lng}<br />
            Last Maintenance: {new Date(device.lastMaintenanceDate).toLocaleDateString()}<br />
            Installed on: {new Date(device.installationDate).toLocaleDateString()}
          </p>
        </div>

        {/* All Readings */}
        <div className="dashboard2-card">
          <h3>All Sensor Readings</h3>
          {latestReadings.length > 0 ? (
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Proxy1</th>
                  <th>Proxy2</th>
                  <th>Proxy3</th>
                  <th>Motor1 Runtime (s)</th>
                  <th>Motor2 Runtime (s)</th>
                  <th>Fault Alarm</th>
                </tr>
              </thead>
              <tbody>
                {latestReadings.map((reading) => (
                  <tr key={reading._id}>
                    <td>{new Date(reading.timestamp).toLocaleString()}</td>
                    <td>{reading.proximityCounts?.proxy1 || 0}</td>
                    <td>{reading.proximityCounts?.proxy2 || 0}</td>
                    <td>{reading.proximityCounts?.proxy3 || 0}</td>
                    <td>{reading.motors?.motor1RunSeconds || 0}</td>
                    <td>{reading.motors?.motor2RunSeconds || 0}</td>
                    <td>{reading.faultAlarm ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No readings available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard2;
