import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppVersionProvider } from "./hooks/version";
import { KeyboardProvider } from "./hooks/keyboardEvents";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppVersionProvider>
      <KeyboardProvider>
        <App />
      </KeyboardProvider>
    </AppVersionProvider>
  </React.StrictMode>,
);
