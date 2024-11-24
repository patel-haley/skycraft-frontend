import { FileText, Info, MessageSquare } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="absolute top-20 right-6 w-80 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Scene Information</h2>
          <button className="p-1 hover:bg-gray-100 rounded">
            <Info className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Mission ID</p>
              <p className="text-sm text-gray-500">DR-2024-03-15-001</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Status Updates</p>
              <p className="text-sm text-gray-500">3 new messages</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Scene Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-xs text-gray-500">Area Coverage</p>
              <p className="text-lg font-semibold text-gray-900">85%</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-xs text-gray-500">Point Density</p>
              <p className="text-lg font-semibold text-gray-900">High</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}