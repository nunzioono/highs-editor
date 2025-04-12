import { useState, useRef, useEffect } from "react"; // Removed useCallback
import { useEditing } from "../hooks/editing";
import { useZoom } from "../hooks/zoom";

// Define base font size (Tailwind's text-sm is 0.875rem) and line height (leading-6 is 1.5rem)
const BASE_FONT_SIZE_REM = 0.875;
const BASE_LINE_HEIGHT_REM = 1.5;

export const Editor = () => {
  const { code, updateCode } = useEditing();
  const { zoomLevel } = useZoom(); // Get zoom level
  const [lineCount, setLineCount] = useState(1);
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

  return (
    <div className="flex-grow flex">
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
    </div>
  );
};

export default Editor;
