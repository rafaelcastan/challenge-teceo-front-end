import React from "react";
import ReactDOM from "react-dom/client";
import { ColorModeContextProvider } from "./context/color-mode";
import { ToastContextProvider } from "./context/toast";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ColorModeContextProvider>
      <ToastContextProvider>
        <App />
      </ToastContextProvider>
    </ColorModeContextProvider>
  </React.StrictMode>
);
