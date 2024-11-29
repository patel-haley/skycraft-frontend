import React, { useState } from "react";
import { Header } from "./components/Header";
import { Viewer3D } from "./components/Viewer3D";
import { Controls } from "./components/Controls";
import { Sidebar } from "./components/Sidebar";
import ChartComponent from "./components/chart";
import Upload from "./components/fileupload";

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

  // Simulated temperature data collection and Excel export (dummy code)
  const recordTemperatureData = () => {
    console.log("Recording temperature data...");
    setTimeout(() => {
      console.log("Data recorded to Excel...");
      // Simulate generating a graph after data collection
      console.log("Generating graph...");
    }, 2000); // Delay for data recording and graph generation
  };

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
