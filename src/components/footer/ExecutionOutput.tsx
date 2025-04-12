import { useState, useRef, useCallback, useEffect } from "react";
import { useEditing } from "../../hooks/editing";
import { useZoom } from "../../hooks/zoom";

// Define base font size (Tailwind's text-sm is 0.875rem)
const BASE_FONT_SIZE_REM = 0.875;
// Define base line height (py-0.5 implies padding, let's assume roughly 1.25rem line-height for text-sm)
const BASE_LINE_HEIGHT_REM = 1.25;

const MIN_HEIGHT_PX = 5 * 16; // 5rem in pixels (assuming 1rem = 16px)
const MAX_HEIGHT_VH = 80;
const DEFAULT_HEIGHT_PX = 10 * 16; // 10rem (h-40)

const ExecutionOutput = () => {
  const { output, clearOutput } = useEditing();
  const { zoomLevel } = useZoom(); // Get zoom level
  const [height, setHeight] = useState(DEFAULT_HEIGHT_PX);
  const [isResizing, setIsResizing] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!outputRef.current) return;
    let newHeight = window.innerHeight - e.clientY;
    const maxHeight = window.innerHeight * (MAX_HEIGHT_VH / 100);
    newHeight = Math.max(MIN_HEIGHT_PX, newHeight);
    newHeight = Math.min(maxHeight, newHeight);
    setHeight(newHeight);
  }, []);

  const handleMouseUp = useCallback(() => {
    if (isResizing) {
        setIsResizing(false);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    }
  }, [isResizing]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const dynamicStyle = {
      fontSize: `${BASE_FONT_SIZE_REM * zoomLevel}rem`,
      lineHeight: `${BASE_LINE_HEIGHT_REM * zoomLevel}rem`,
  };

  return (
    <div
      ref={outputRef}
      className="border-t border-gray-300 flex flex-col overflow-hidden"
      style={{ height: `${height}px`, minHeight: `${MIN_HEIGHT_PX}px` }}
    >
      {/* Handle element */}
      <div
        onMouseDown={handleMouseDown}
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
      <div
        className="bg-white p-3 overflow-y-auto font-mono text-sm flex-grow"
        style={dynamicStyle}
      >
        {output.length > 0 ? (
          output.map((line, index) => (
            <div key={index}>
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

export default ExecutionOutput; // Export the component
