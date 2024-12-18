<<<<<<< HEAD
import React, { useState } from "react";
import { Header } from "./components/Header";
import { Viewer3D } from "./components/Viewer3D";
import { Controls } from "./components/Controls";
import { Sidebar } from "./components/Sidebar";
import ChartComponent from "./components/chart";
import Upload from "./components/fileupload";
=======
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { Controls } from './components/Controls';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Viewer3D } from './components/Viewer3D';
import SensorGraph from "./components/sensorgraph";

>>>>>>> fc6a525 (add sensorgraph)

function App() {
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state to show "generating" message

  const toggleImageVisibility = () => {
    // Start the simulated process of generating the graph
    setIsLoading(true);
    setIsImageVisible(false); // Hide the image when the process starts
    setTimeout(() => {
      // Simulate a delay of 3 seconds (e.g., data collection, processing)
      setIsImageVisible(true); // Show the image after the process
      setIsLoading(false); // Hide loading state after the image is generated
    }, 3000); // Delay in milliseconds (3 seconds)
  };

<<<<<<< HEAD
  // Simulated temperature data collection and Excel export (dummy code)
  const recordTemperatureData = () => {
    console.log("Recording temperature data...");
    setTimeout(() => {
      console.log("Data recorded to Excel...");
      // Simulate generating a graph after data collection
      console.log("Generating graph...");
    }, 2000); // Delay for data recording and graph generation
  };
=======
const App: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [spikes, setSpikes] = useState<Spike[]>([]);

  const App: React.FC = () => {
    return (
      <div>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>DHT11 Sensor Visualization</h1>
        <SensorGraph />
      </div>
    );
  };

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
>>>>>>> fc6a525 (add sensorgraph)

  return (
    <div className="w-screen h-screen bg-darkgray-100 relative overflow-hidden">
      {/* Header Component */}
      <Header />

      <main className="w-full h-full pt-16 flex">
        {/* 3D Viewer */}
        {/* <Viewer3D /> */}
        {/* <Upload/> */}
        {/* Controls */}
        <Controls />

        {/* Sidebar */}
        <Sidebar />

        {/* Button and Graph at bottom-right */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => {
              recordTemperatureData();
              toggleImageVisibility();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {isLoading ? "Generating..." : "Generate Temperature Graph"}
          </button>

          {/* Image that can be toggled */}
          {isImageVisible && (
            <div className="mt-2">
             < ChartComponent/>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


export default App;
