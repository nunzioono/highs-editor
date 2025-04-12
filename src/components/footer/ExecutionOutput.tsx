import { useState, useRef, useCallback, useEffect } from "react";
import { useEditing } from "../../hooks/editing";

const MIN_HEIGHT_PX = 5 * 16; // 5rem in pixels (assuming 1rem = 16px)
const MAX_HEIGHT_VH = 80;
const DEFAULT_HEIGHT_PX = 10 * 16; // 10rem (h-40)

const ExecutionOutput = () => {
  const { output, clearOutput } = useEditing();
  const [height, setHeight] = useState(DEFAULT_HEIGHT_PX);
  const [isResizing, setIsResizing] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!outputRef.current) return;
    let newHeight = window.innerHeight -e.clientY;
    const maxHeight = window.innerHeight * (MAX_HEIGHT_VH / 100);
    newHeight = Math.max(MIN_HEIGHT_PX, newHeight);
    newHeight = Math.min(maxHeight, newHeight);
    setHeight(newHeight);
  }, []); // No dependencies needed

  // This function will now ONLY set the state and clean up styles
  const handleMouseUp = useCallback(() => {
    // Check if we are actually resizing to prevent unnecessary state updates
    // and style changes if mouseup happens without a preceding mousedown+mousemove
    if (isResizing) {
        setIsResizing(false);
        // Clean up styles applied during drag
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    }
  }, [isResizing]); // Depend on isResizing

  // This function will now ONLY set the state and apply initial styles
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    // Apply styles for drag state
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
    // DO NOT add listeners here - useEffect will handle it
  };

  // Centralized effect for adding/removing global listeners
  useEffect(() => {
    if (isResizing) {
      // Add listeners when resizing starts
      window.addEventListener("mousemove", handleMouseMove);
      // Use the useCallback version of handleMouseUp for stability
      window.addEventListener("mouseup", handleMouseUp);
    }

    // Cleanup function: remove listeners when isResizing becomes false or component unmounts
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    // Rerun effect if isResizing state changes, or if the handler functions change
  }, [isResizing, handleMouseMove, handleMouseUp]);


  return (
    <div
      ref={outputRef}
      className="border-t border-gray-300 flex flex-col overflow-hidden"
      style={{ height: `${height}px`, minHeight: `${MIN_HEIGHT_PX}px` }}
    >
      {/* Handle element */}
      <div
        onMouseDown={handleMouseDown} // Only mousedown is needed here
        className="h-2 bg-gray-200 hover:bg-gray-400 cursor-row-resize border-b border-gray-300 flex-shrink-0"
        title="Drag to resize"
      ></div>
      {/* Header */}
      <div className="bg-gray-100 px-3 py-1 font-semibold border-b border-gray-300 flex justify-between items-center flex-shrink-0">
        <span>Execution Output</span>
        <button
          onClick={clearOutput}
          className="text-xs px-2 py-1 bg-white rounded border border-gray-300/70 hover:bg-gray-50"
        >
          Clear
        </button>
      </div>
      {/* Content area */}
      <div className="bg-white p-3 overflow-y-auto font-mono text-sm flex-grow">
        {output.length > 0 ? (
          output.map((line, index) => (
            <div key={index} className="py-0.5">
              {line}
            </div>
          ))
        ) : (
          <div className="text-gray-400 italic">No output</div>
        )}
      </div>
    </div>
  );
};

export default ExecutionOutput;
