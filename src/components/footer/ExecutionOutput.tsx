import { useEditing } from "../../hooks/editing";

const ExecutionOutput = () => {
  const { output, clearOutput } = useEditing();

  return (
    <div className="border-t border-gray-300">
      <div className="bg-gray-100 px-3 py-1 font-semibold border-b border-gray-300 flex justify-between items-center">
        <span>Execution Output</span>
        <button
          onClick={clearOutput}
          className="text-xs px-2 py-1 bg-white rounded border border-gray-300/70 hover:bg-gray-50"
        >
          Clear
        </button>
      </div>
      <div className="bg-white p-3 h-32 overflow-y-auto font-mono text-sm">
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
