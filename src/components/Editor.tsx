import { useState, useRef, useEffect } from "react";
import { useEditing } from "../hooks/editing";
import { useZoom } from "../hooks/zoom";

// Define base font size (Tailwind's text-sm is 0.875rem) and line height (leading-6 is 1.5rem)
const BASE_FONT_SIZE_REM = 0.875;
const BASE_LINE_HEIGHT_REM = 1.5;

type Tab = 'code'; // Define possible tab types

export const Editor = () => {
  const { code, updateCode } = useEditing();
  const { zoomLevel } = useZoom(); // Get zoom level
  const [lineCount, setLineCount] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>('code'); // State for active tab
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update line count when content changes
  useEffect(() => {
    const lines = code.split("\n").length;
    setLineCount(lines);
  }, [code]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateCode(e.target.value);
  };

  // Handle tab key to insert spaces instead of changing focus
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Insert 2 spaces when tab is pressed
      const newText = code.substring(0, start) + '  ' + code.substring(end);
      updateCode(newText);

      // Move cursor position
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Calculate dynamic font size and line height
  const dynamicFontSize = `${BASE_FONT_SIZE_REM * zoomLevel}rem`;
  const dynamicLineHeight = `${BASE_LINE_HEIGHT_REM * zoomLevel}rem`;
  const dynamicStyle = {
    fontSize: dynamicFontSize,
    lineHeight: dynamicLineHeight,
  };

  // Function to get tab button classes
  const getTabClass = (tabName: Tab) => {
    // Base classes for all tabs: relative positioning, padding, transitions, clip-path, height, and font size
    const baseClasses = `
      px-6 relative transition-colors duration-200 ease-in-out
      [clip-path:polygon(10%_0%,_90%_0%,_100%_100%,_0%_100%)]
      h-[80%] flex items-center justify-center text-sm font-semibold
    `; // Added text-sm
    // Active tab classes: slightly darker background, blue text, higher z-index
    const activeClasses = `bg-gray-100 text-blue-700 z-10`;
    // Inactive tab classes: even darker gray background and text
    const inactiveClasses = `bg-gray-200 text-gray-700 hover:text-gray-900 hover:bg-gray-400`;

    return `${baseClasses} ${
      activeTab === tabName ? activeClasses : inactiveClasses
    }`;
  };

  return (
    <div className="flex-grow flex flex-col">
      {/* Tab buttons container with bottom border, specific background, and fixed height */}
      {/* Added negative margin bottom to overlap border slightly */}
      <div className="flex border-b border-gray-200 mb-[-1px] bg-gray-300 h-10 items-end"> {/* Added h-10 (40px) and items-end */}
        <button
          className={getTabClass('code')}
          onClick={() => setActiveTab('code')}
        >
          Code
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-grow flex border border-gray-200 border-t-0"> {/* Added border to content area, removed top */}
        {activeTab === 'code' && (
          <>
            {/* Line numbers column */}
            <div
              className="bg-gray-300 text-black font-mono p-2 text-right select-none w-12"
              style={dynamicStyle}
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i + 1}>
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Text editor */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-white font-mono p-2 outline-none resize-none border-none"
              style={dynamicStyle}
              spellCheck="false"
              placeholder="Start typing..."
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Editor;
