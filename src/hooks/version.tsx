import { createContext, useContext, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

const AppVersionContext = createContext<string | undefined>(undefined);

export const AppVersionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appVersion, setAppVersion] = useState<string>("");

  useEffect(() => {
    const fetchAppVersion = async () => {
      try {
        const version = await invoke("get_app_version") as string;
        setAppVersion("v" + version);
      } catch (error) {
        // console.error("Error fetching app version:", error);
        setAppVersion("Web");
      }
    };

    fetchAppVersion();
  }, []);

  return (
    <AppVersionContext.Provider value={appVersion}>
      {children}
    </AppVersionContext.Provider>
  );
};

export const useAppVersion = () => {
  const context = useContext(AppVersionContext);
  if (context === undefined) {
    throw new Error("useAppVersion must be used within an AppVersionProvider");
  }
  return context;
};
