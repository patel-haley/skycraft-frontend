import { Camera, Plane, Layers, Map, ZoomIn, ZoomOut } from 'lucide-react';

export function Controls() {
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Plane className="w-6 h-6 text-gray-700" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Camera className="w-6 h-6 text-gray-700" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Map className="w-6 h-6 text-gray-700" />
        </button>
        <div className="w-px h-8 bg-gray-300" />
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ZoomIn className="w-6 h-6 text-gray-700" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ZoomOut className="w-6 h-6 text-gray-700" />
        </button>
        <div className="w-px h-8 bg-gray-300" />
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Layers className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
