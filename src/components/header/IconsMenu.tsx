// filepath: src/components/header/IconsMenu.tsx
import { FiFile, FiSave, FiX, FiPlay, FiZoomIn, FiZoomOut } from "react-icons/fi";
import { useZoom } from "../../hooks/zoom";
import { FileOperations } from "./types.ts"; // Assuming types are moved or defined appropriately

interface IconsMenuProps {
  fileOperations: FileOperations;
}

export const IconsMenu = ({ fileOperations }: IconsMenuProps) => {
  const { openedFile, handleRun, setFile, saveFile, closeFile } = fileOperations;
  const { zoomLevel, setZoomLevel } = useZoom();
  const isFileOpen = openedFile !== null;
  const baseClass = "relative p-2 bg-transparent border-r border-gray-300/70 hover:bg-gray-200/50 flex items-center justify-center";
  const disabledClass = " opacity-50 cursor-not-allowed";

  const zoomIn = () => setZoomLevel(prev => prev + 0.1);
  const zoomOut = () => setZoomLevel(prev => prev - 0.1);

  const zoomPercentage = Math.round(zoomLevel * 100);

  const handleOpenClick = () => {
    // Trigger the hidden input click if needed, or rely on label association
    // This button itself doesn't need direct file logic if input overlay works
  };

  return (
    <div className="flex border-b border-gray-200">
      {/* File Operations */}
      <button
        className={baseClass + (isFileOpen ? disabledClass : "")}
        title="Open file"
        disabled={isFileOpen}
        onClick={handleOpenClick} // Can be empty if input overlay is sufficient
      >
        <FiFile />
        <input
          type="file"
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          accept=".lp,.sav,.xlp,.xli"
          onChange={setFile}
          disabled={isFileOpen}
        />
      </button>
      <button className={baseClass + (!isFileOpen ? disabledClass : "")} title="Save file" onClick={saveFile} disabled={!isFileOpen}>
        <FiSave />
      </button>
      <button className={baseClass + (!isFileOpen ? disabledClass : "")} title="Close file" onClick={closeFile} disabled={!isFileOpen}>
        <FiX />
      </button>
      <button
        className={baseClass + " text-green-600" + (!isFileOpen ? disabledClass : "")}
        title="Run code"
        onClick={handleRun}
        disabled={!isFileOpen}
      >
        <FiPlay />
      </button>

      {/* Spacer */}
      <div className="flex-grow"></div>

      {/* Zoom Controls */}
      <button className={baseClass} title="Zoom Out" onClick={zoomOut}>
        <FiZoomOut />
      </button>
      <span className="p-2 text-xs border-r border-gray-300/70 flex items-center justify-center w-16" title="Current Zoom">
        {zoomPercentage}%
      </span>
      <button className={baseClass} title="Zoom In" onClick={zoomIn}>
        <FiZoomIn />
      </button>
    </div>
  );
};

export default IconsMenu;
