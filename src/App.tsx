import React from 'react';
import { Header } from './components/Header';
import { Viewer3D } from './components/Viewer3D';
import { Controls } from './components/Controls';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <div className="w-screen h-screen bg-darkgray-100 relative overflow-hidden">
      <Header />
      <main className="w-full h-full pt-16">
        <Viewer3D />
        <Controls />
        <Sidebar />
      </main>
    </div>
  );
}

export default App;