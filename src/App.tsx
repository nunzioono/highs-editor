import { useState } from 'react';
import './App.css';
import { Editor } from './components/Editor';
import { KeyboardProvider } from './hooks/keyboardEvents';
import Header from './components/Header';
import Footer from './components/Footer';

// Define the type for our code execution state
interface CodeExecutionState {
  fileName: string;
  openedFile: string | null;
  code: string;
  output: string;
}

function App() {
  // Initialize the global code execution state
  const [executionState, setExecutionState] = useState<CodeExecutionState>({
    fileName: '',
    openedFile: null,
    code: '',
    output: ''
  });

  // Function to update code when Ctrl+S is pressed in editor
  const updateCode = (newCode: string) => {
    if (executionState.openedFile) {
      setExecutionState({
        ...executionState,
        code: newCode
      });
      console.log(`Code updated for file: ${executionState.openedFile}`);
      // Here you could also save to a backend or perform other actions
    }
  };

  // Function to open a file
  const openFile = (fileName: string, fileContent: string) => {
    setExecutionState({
      ...executionState,
      openedFile: fileName,
      fileName: fileName,
      code: fileContent
    });
  };

  return (
    <KeyboardProvider>
      <div className="h-screen w-screen flex flex-col">
        <Header/>
        <Editor

        />
        <Footer/>
      </div>
    </KeyboardProvider>
  );
}

export default App;
