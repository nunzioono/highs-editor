import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppVersionProvider } from "./hooks/version";
import { KeyboardProvider } from "./hooks/keyboardEvents";
import { HighsProvider } from "./hooks/highs";
import { EditingProvider } from "./hooks/editing";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppVersionProvider>
      <EditingProvider>
        <HighsProvider>
          <KeyboardProvider>
            <App />
          </KeyboardProvider>
        </HighsProvider>
      </EditingProvider>
    </AppVersionProvider>
  </React.StrictMode>,
);
