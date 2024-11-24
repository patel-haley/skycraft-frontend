import { AlertTriangle, Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Disaster Area Viewer</h1>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              <AlertTriangle className="w-4 h-4 mr-1" />
              Live Feed
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              Last update: <span className="font-medium">2 minutes ago</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white font-medium">JS</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}