// filepath: src/components/header/DropdownsMenu.tsx
import { useState } from "react";
import { useZoom } from "../../hooks/zoom";
import MenuButton from "./MenuButton";
import OpenButton from "./OpenButton";
import { FileOperations } from "./types"; // Assuming types are moved or defined appropriately

interface DropdownsMenuProps {
  fileOperations: FileOperations;
}

const DropdownsMenu = ({ fileOperations }: DropdownsMenuProps) => {
  const { openedFile, handleRun, setFile, saveFile, closeFile } = fileOperations;
  const { setZoomLevel } = useZoom();
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);

  const toggleFileMenu = () => {
    setIsFileMenuOpen(!isFileMenuOpen);
    setIsViewMenuOpen(false);
  };

  const toggleViewMenu = () => {
    setIsViewMenuOpen(!isViewMenuOpen);
    setIsFileMenuOpen(false);
  };

  const closeAllMenus = () => {
      setIsFileMenuOpen(false);
      setIsViewMenuOpen(false);
  }

  const zoomIn = () => { setZoomLevel(prev => prev + 0.1); closeAllMenus(); };
  const zoomOut = () => { setZoomLevel(prev => prev - 0.1); closeAllMenus(); };
  const resetZoom = () => { setZoomLevel(1.0); closeAllMenus(); };

  const handleSave = () => { saveFile(); closeAllMenus(); };
  const handleClose = () => { closeFile(); closeAllMenus(); };
  const handleRunClick = () => { handleRun(); closeAllMenus(); }; // Close menu on run too

  // Note: OpenButton handles its own logic via the input overlay

  return (
    <div className="border-b border-gray-200 flex">
      {/* File Menu */}
      <div className="relative inline-block">
        <button
          className="px-4 py-1 bg-transparent border-r border-gray-300/70 hover:bg-gray-200/50"
          onClick={toggleFileMenu}
        >
          File
        </button>
        {isFileMenuOpen && (
          <div className="absolute left-0 mt-0 w-40 bg-white border border-gray-300/70 z-10 shadow-md">
            <ul>
              <OpenButton setFile={setFile} disabled={!!openedFile} />
              <MenuButton action="Save" onClick={handleSave} disabled={!openedFile} />
              <MenuButton action="Close" onClick={handleClose} disabled={!openedFile} />
            </ul>
          </div>
        )}
      </div>

      {/* View Menu */}
      <div className="relative inline-block">
        <button
          className="px-4 py-1 bg-transparent border-r border-gray-300/70 hover:bg-gray-200/50"
          onClick={toggleViewMenu}
        >
          View
        </button>
        {isViewMenuOpen && (
          <div className="absolute left-0 mt-0 w-40 bg-white border border-gray-300/70 z-10 shadow-md">
            <ul>
              <MenuButton action="Zoom In" onClick={zoomIn} disabled={false} />
              <MenuButton action="Zoom Out" onClick={zoomOut} disabled={false} />
              <MenuButton action="Reset Zoom" onClick={resetZoom} disabled={false} />
            </ul>
          </div>
        )}
      </div>

      {/* Run Menu */}
      <div className="relative inline-block">
        <button
          className="px-4 py-1 bg-transparent border-r border-gray-300/70 hover:bg-gray-200/50"
          onClick={handleRunClick} // Use wrapper to close menu
          disabled={!openedFile} // Disable run if no file is open
        >
          Run
        </button>
      </div>
    </div>
  );
};

export default DropdownsMenu;
