import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Header } from './components/Header';
import { Viewer3D } from './components/Viewer3D';
import { Controls } from './components/Controls';
import { Sidebar } from './components/Sidebar';

// Define the data types
interface DataPoint {
  Timestamp: string;
  Temperature: number;
  Humidity: number;
}

interface Spike {
  timestamp: string;
  temperature: number;
}

const App: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [spikes, setSpikes] = useState<Spike[]>([]);

  useEffect(() => {
    // Fetch regular data
    axios.get("http://172.20.10.7:5000/data").then((response) => {
      setData(response.data);
    });

    // Fetch spikes
    axios.get("http://172.20.10.7:5000/spikes?threshold=2").then((response) => {
      setSpikes(response.data);
    });
  }, []);

  return (
    <div className="w-screen h-screen bg-darkgray-100 relative overflow-hidden">
      {/* Header Component */}
      <Header />

      <main className="w-full h-full pt-16 flex">
        {/* 3D Viewer */}
        <Viewer3D />

        {/* Controls for your app */}
        <Controls />

        {/* Sidebar for additional info */}
        <Sidebar />
      </main>

      <div style={{ padding: "20px" }}>
        <h1>Temperature Data</h1>
        <LineChart
          width={800}
          height={400}
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <Line type="monotone" dataKey="Temperature" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="Timestamp" />
          <YAxis />
          <Tooltip />
        </LineChart>

        <h2>Temperature Spikes</h2>
        <ul>
          {spikes.map((spike, index) => (
            <li key={index}>
              {spike.timestamp} - {spike.temperature}°C
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
