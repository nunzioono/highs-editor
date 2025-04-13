import { createContext, useContext, useState, useEffect } from "react"; // Import useEffect
import { useAppVersion } from "./version";

interface EditingState {
  openedFile: string | null;
  fileModified: boolean;
  code: string;
  output: string[];
}

export interface EditingContextType {
  openedFile: string | null;
  fileModified: boolean;
  code: string;
  output: string[];
  openFile: (fileName: string, fileContent: string) => void;
  closeFile: () => void;
  saveFile: () => void;
  updateCode: (newCode: string) => void;
  updateOutput: (newOutput: string[]) => void;
  clearOutput: () => void;
}

const EditingContext = createContext<EditingContextType | undefined>(undefined);

export const EditingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const version = useAppVersion();
  // Initialize output state without the version initially
  const [editingState, setEditingState] = useState<EditingState>({
    openedFile: null,
    fileModified: false,
    code: '',
    output: ["Ready to execute your code"] // Start with a default or empty state
  });

  // Effect to set the initial output once the version is loaded
  useEffect(() => {
    // Check if version is loaded and if we haven't already set the welcome message
    // or opened a file (to avoid overwriting existing output)
    if (version && editingState.openedFile === null && editingState.output.length === 1 && editingState.output[0] === "Ready to execute your code") {
      setEditingState(prevState => ({
        ...prevState,
        output: [
          `Welcome to Highs Editor ${version}`,
          "Ready to execute your code"
        ]
      }));
    }
    // Only run this effect when the version changes
  }, [version]); // Dependency array includes version

  const openFile = (fileName: string, fileContent: string) => {
    if (editingState.openedFile) {
      return;
    }


    setEditingState(prevState => {
      const newState = {
        ...prevState,
        openedFile: fileName,
        code: fileContent,
        fileModified: false
      };

      return newState;
    });

  };

  const closeFile = () => {
    if (!editingState.openedFile) {
      return;
    }

    setEditingState(prevState => {
      const initialOutput = version
        ? [`Welcome to Highs Editor ${version}`, "Ready to execute your code"]
        : ["Ready to execute your code"]; // Recalculate initial text here too
      const newState = {
        ...prevState,
        openedFile: null,
        code: '',
        fileModified: false,
        output: initialOutput // Reset output correctly
      };

      return newState;
    });
  };

  const saveFile = () => {
    if (!editingState.openedFile) {
      return;
    }

    setEditingState({
      ...editingState,
      fileModified: false
    });
  };

  const updateCode = (newCode: string) => {

    setEditingState({
      ...editingState,
      code: newCode,
      fileModified: true
    });
  };

  const updateOutput = (newOutput: string[]) => {
    if (!editingState.openedFile) {
      return;
    }

    setEditingState({
      ...editingState,
      output: [...newOutput],
    });
  };

  const clearOutput = () => {
    if (!editingState.openedFile) {
      return;
    }

    setEditingState({
      ...editingState,
      output: []
    });
  };

  return (
    <EditingContext.Provider value={{
      ...editingState,
      openFile,
      closeFile,
      saveFile,
      updateCode,
      updateOutput,
      clearOutput
    }}>
      {children}
    </EditingContext.Provider>
  );
};

export const useEditing = () => {
  const context = useContext(EditingContext);
  if (context === undefined) {
    throw new Error("useEditing must be used within an EditingProvider");
  }
  return context;
};
