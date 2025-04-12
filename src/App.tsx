import './App.css';
import { useEffect } from "react"; // Import useEffect
import Editor from "./components/Editor";
import Footer from "./components/Footer";
import Header from "./components/header/Header";
import { useZoom } from "./hooks/zoom"; // Import useZoom

function App() {
  const { setZoomLevel } = useZoom(); // Get the zoom setter

  // Effect to add and remove global event listeners
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if Ctrl or Cmd key is pressed
      if (event.ctrlKey || event.metaKey) {
        let zoomChanged = false;
        if (event.key === '+' || event.key === '=') {
          // Zoom In
          setZoomLevel(prev => prev + 0.1);
          zoomChanged = true;
        } else if (event.key === '-') {
          // Zoom Out
          setZoomLevel(prev => prev - 0.1);
          zoomChanged = true;
        }

        // Prevent default browser zoom if we handled the event
        if (zoomChanged) {
          event.preventDefault();
        }
      }
    };

    const handleWheel = (event: WheelEvent) => {
      // Check if Ctrl or Cmd key is pressed
      if (event.ctrlKey || event.metaKey) {
        // Prevent default browser scroll/zoom behavior
        event.preventDefault();

        // Determine zoom direction based on deltaY
        if (event.deltaY < 0) {
          // Scrolling up - Zoom In
          setZoomLevel(prev => prev + 0.1);
        } else if (event.deltaY > 0) {
          // Scrolling down - Zoom Out
          setZoomLevel(prev => prev - 0.1);
        }
      }
    };

    // Add listeners
    window.addEventListener('keydown', handleKeyDown);
    // Add wheel listener with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup function to remove listeners when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [setZoomLevel]); // Add setZoomLevel as a dependency

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Editor />
      <Footer />
    </div>
  );
}

export default App;
