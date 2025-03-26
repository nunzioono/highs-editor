import ExecutionOutput from "./footer/ExecutionOutput";
import StatusBar from "./footer/StatusBar";

const Footer = () => {
  return (
    <div className="flex flex-col bg-gray-100 border-t border-gray-300">
      {/* Execution Output Area - Shows code execution results with cancel ability */}
        <ExecutionOutput />

      {/* Status Bar - Shows editor state, date/time, and version */}
        <StatusBar />
    </div>
  );
};

export default Footer;


