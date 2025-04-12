import { useState, useEffect } from "react";
import { useAppVersion } from "../../hooks/version";

const StatusBar = () => {
  const appVersion = useAppVersion();
  // State to hold the current date and time
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    // Set up an interval to update the date and time every second
    const timerId = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000); // Update every 1000ms (1 second)

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(timerId);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="bg-gray-300 px-3 py-1 text-xs text-gray-700 flex justify-between border-t border-gray-400">
      <div className="flex space-x-4">
        <span>Ready</span>
        {/* Display the state variable which updates */}
        <span>{dateTime}</span>
      </div>
      <div>
        <span>Highs Editor {appVersion}</span>
      </div>
    </div>
  );
};

export default StatusBar;
