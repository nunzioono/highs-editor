import { useState, useRef, useEffect } from "react";

export const Editor = () => {
  const [content, setContent] = useState("");
  const [lineCount, setLineCount] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update line count when content changes
  useEffect(() => {
    const lines = content.split("\n").length;
    setLineCount(lines);
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
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
      const newText = content.substring(0, start) + '  ' + content.substring(end);
      setContent(newText);

      // Move cursor position
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="flex-grow flex">
      {/* Line numbers column */}
      <div className="bg-gray-300 text-black font-mono p-2 text-right select-none w-12">
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i + 1} className="leading-6">
            {i + 1}
          </div>
        ))}
      </div>

      {/* Text editor */}
      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="flex-grow bg-white font-mono p-2 outline-none resize-none border-none leading-6"
        spellCheck="false"
        placeholder="Start typing..."
      />
    </div>
  );
};

export default Editor;
