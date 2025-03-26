import { createContext, useContext, useState } from "react";

interface EditingState {
  openedFile: string | null;
  fileModified: boolean;
  code: string;
  output: string[];
}

interface EditingContextType {
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
  const [editingState, setEditingState] = useState<EditingState>({
    openedFile: null,
    fileModified: false,
    code: '',
    output: [
      "Welcome to Highs Editor",
      "Ready to execute your code"
    ]
  });

  const openFile = (fileName: string, fileContent: string) => {
    if (editingState.openedFile) {
      return;
    }

    console.log("Opening file. Current state:", editingState);

    setEditingState(prevState => {
      const newState = {
        ...prevState,
        openedFile: fileName,
        code: fileContent,
        fileModified: false
      };

      console.log("New state after opening file:", newState);
      return newState;
    });

    console.log("New state after opening file:", editingState);
  };

  const closeFile = () => {
    if (!editingState.openedFile) {
      return;
    }
    console.log("Closing file. Current state:", editingState);

    setEditingState(prevState => {
      const newState = {
        ...prevState,
        openedFile: null,
        code: '',
        fileModified: false
      };

      console.log("New state after closing file:", newState);
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
