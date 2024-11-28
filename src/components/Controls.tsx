import { ZoomIn, ZoomOut, ArrowRight, ArrowLeft, ArrowUp, ArrowDown } from 'lucide-react';
import { useState } from 'react';

export function Controls() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  const handleZoomIn = () => {
    setZoomLevel(prevZoom => Math.min(prevZoom + 0.1, 3)); // Max zoom level 3
  };

  const handleZoomOut = () => {
    setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 1)); // Min zoom level 1
  };

  // Rotation control functions
  const rotate = (direction: string) => {
    setRotation(prevRotation => {
      const delta = 15; // degrees to rotate on each click
      if (direction === 'left') return { ...prevRotation, y: prevRotation.y - delta };
      if (direction === 'right') return { ...prevRotation, y: prevRotation.y + delta };
      if (direction === 'up') return { ...prevRotation, x: prevRotation.x - delta };
      if (direction === 'down') return { ...prevRotation, x: prevRotation.x + delta };
      return prevRotation;
    });
  };

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="w-px h-8 bg-gray-300" />

        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={handleZoomIn}
        >
          <ZoomIn className="w-6 h-6 text-gray-700" />
        </button>

        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={handleZoomOut}
        >
          <ZoomOut className="w-6 h-6 text-gray-700" />
        </button>

        <div className="w-px h-8 bg-gray-300" />

        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => rotate('left')}
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>

        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => rotate('right')}
        >
          <ArrowRight className="w-6 h-6 text-gray-700" />
        </button>

        <div className="w-px h-8 bg-gray-300" />

        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => rotate('up')}
        >
          <ArrowUp className="w-6 h-6 text-gray-700" />
        </button>

        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => rotate('down')}
        >
          <ArrowDown className="w-6 h-6 text-gray-700" />
        </button>

        <div className="w-px h-8 bg-gray-300" />
      </div>
    </div>
  );
}
