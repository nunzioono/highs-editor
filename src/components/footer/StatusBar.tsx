import { useAppVersion } from "../../hooks/version";

const StatusBar = () => {
  // Get current date and time for the status bar
  const appVersion = useAppVersion();
  const currentDateTime = new Date().toLocaleString();

  return (
    <div className="bg-gray-300 px-3 py-1 text-xs text-gray-700 flex justify-between border-t border-gray-400">
      <div className="flex space-x-4">
        <span>Ready</span>
        <span>{currentDateTime}</span>
      </div>
      <div>
        <span>Highs Editor {appVersion}</span>
      </div>
    </div>
  );
};

export default StatusBar;
