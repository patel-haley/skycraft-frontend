import "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const SensorGraph: React.FC = () => {
  const [data, setData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [] as number[],
        borderColor: "red",
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Added to fix error
        fill: true,
      },
      {
        label: "Humidity (%)",
        data: [] as number[],
        borderColor: "blue",
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Added to fix error
        fill: true,
      },
    ],
  });

  const fetchData = async () => {
    try {
      const response = await fetch("http://172.20.10.7:5000/data"); // Replace with Pi's IP
      const result = await response.json();

      setData({
        labels: result.labels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: result.temperature,
            borderColor: "red",
            backgroundColor: "rgba(255, 99, 132, 0.2)", // Ensure it's present here too
            fill: true,
          },
          {
            label: "Humidity (%)",
            data: result.humidity,
            borderColor: "blue",
            backgroundColor: "rgba(54, 162, 235, 0.2)", // Ensure it's present here too
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch on component mount
    const interval = setInterval(fetchData, 2000); // Update every 2 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h2>DHT11 Sensor Data</h2>
      <Line data={data} />
    </div>
  );
};

export default SensorGraph;
