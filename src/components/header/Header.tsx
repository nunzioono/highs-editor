// filepath: c:\Users\nunzi\OneDrive\Desktop\highs-editor\src\components\Header.tsx
import { useHighs } from "../../hooks/highs"; // Go up two levels to reach hooks
import { useEditing } from "../../hooks/editing"; // Go up two levels to reach hooks
import LogoType from "./LogoType"; // Import from the same directory
import IconsMenu from "./IconsMenu"; // Import from the same directory
import DropdownsMenu from "./DropdownsMenu"; // Import from the same directory
import { FileOperations } from "./types"; // Import from the same directory
import { HighsSolution } from "highs";

const Header = () => {
  const { openedFile, fileModified, code, updateOutput, openFile, saveFile, closeFile } = useEditing();
  const highs = useHighs();

  const handleRun = () => {
    if (!highs || !code) {
        updateOutput(["HiGHS instance not ready or no code to run."]);
        return;
    }
    try {
      // Ensure highs.solve is called correctly
      const solution: HighsSolution = highs.solve(code); // Assuming solve takes code string
      if (solution) {
        // Format the output nicely - adjust based on actual solution structure
        const outputLines = [JSON.stringify(solution, null, 2)];
        updateOutput(outputLines);
      } else {
        updateOutput(["Solver returned no solution."]);
      }
    } catch (error) {
      console.error("Solver error:", error);
      updateOutput([`Error: ${(error as Error).message}`]);
    }
  };


  const setFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const content = await file.text();
        openFile(file.name, content);
      } catch (error) {
        console.error("Error reading file:", error);
        updateOutput([`Error reading file: ${(error as Error).message}`]);
      }
      // Reset input value to allow opening the same file again
      e.target.value = '';
    }
  };

  // Create a file operations object that can be passed to both menus
  const fileOperations: FileOperations = {
    openedFile,
    fileModified,
    handleRun,
    setFile,
    saveFile,
    closeFile
  };

  return (
    <div className="bg-gray-100">
      {/* App title bar - centered title with version */}
      <div className="bg-gray-200 py-1.5 border-b border-gray-300 relative">
        <LogoType openedFile={openedFile} fileModified={fileModified ?? false} />
      </div>

      {/* First row - dropdown menus */}
      <DropdownsMenu fileOperations={fileOperations} />

      {/* Second row - icon toolbar */}
      <IconsMenu fileOperations={fileOperations} />
    </div>
  );
};

export default Header;
