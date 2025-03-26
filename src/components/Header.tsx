import { useState } from "react";
import { FiFile, FiSave, FiX, FiPlay } from "react-icons/fi";
import { useAppVersion } from "../hooks/version";

const Header = () => {
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const appVersion = useAppVersion();

  const toggleFileMenu = () => {
    setIsFileMenuOpen(!isFileMenuOpen);
  };

  // We'll create a dummy handler for the run action
  const handleRun = () => {
    console.log("Running code...");
    // You can implement actual code execution later
  };

  return (
    <div className="bg-gray-100">
      {/* App title bar - centered title with version */}
      <div className="bg-gray-200 py-1.5 border-b border-gray-300 relative">
        <h1 className="text-sm font-semibold text-center">
          Highs Editor <span className="text-xs text-gray-600">{appVersion}</span>
        </h1>
      </div>

      {/* First row - dropdown menus */}
      <div className="border-b border-gray-200 flex">
        <div className="relative inline-block">
          <button
            className="px-4 py-1 bg-transparent border-r border-gray-300/70 hover:bg-gray-200/50"
            onClick={toggleFileMenu}
          >
            File
          </button>

          {isFileMenuOpen && (
            <div className="absolute left-0 mt-0 w-40 bg-white border border-gray-300/70 z-10">
              <ul>
                <li className="px-4 py-1 hover:bg-gray-100 cursor-pointer">Open</li>
                <li className="px-4 py-1 hover:bg-gray-100 cursor-pointer">Save</li>
                <li className="px-4 py-1 hover:bg-gray-100 cursor-pointer">Close</li>
                <li className="px-4 py-1 hover:bg-gray-100 cursor-pointer border-t border-gray-200" onClick={handleRun}>Run</li>
              </ul>
            </div>
          )}
        </div>

        {/* Added a Run dropdown menu */}
        <div className="relative inline-block">
          <button
            className="px-4 py-1 bg-transparent border-r border-gray-300/70 hover:bg-gray-200/50"
            onClick={handleRun}
          >
            Run
          </button>
        </div>
      </div>

      {/* Second row - icon toolbar */}
      <div className="flex border-b border-gray-200">
        <button className="p-2 bg-transparent border-r border-gray-300/70 hover:bg-gray-200/50" title="Open file">
          <FiFile />
        </button>
        <button className="p-2 bg-transparent border-r border-gray-300/70 hover:bg-gray-200/50" title="Save file">
          <FiSave />
        </button>
        <button className="p-2 bg-transparent border-r border-gray-300/70 hover:bg-gray-200/50" title="Close file">
          <FiX />
        </button>

        {/* Added Run button with play icon */}
        <button
          className="p-2 bg-transparent border-r border-gray-300/70 hover:bg-gray-200/50 text-green-600"
          title="Run code"
          onClick={handleRun}
        >
          <FiPlay />
        </button>
      </div>
    </div>
  );
};

export default Header;
