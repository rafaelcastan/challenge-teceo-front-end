import { RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar";
import { ColorModeContextProvider } from "./context/color-mode";
import { ToastContextProvider } from "./context/toast";
import { router } from "./routes";

function App() {
  return (
    <ColorModeContextProvider>
      <ToastContextProvider>
        <Navbar />
        <RouterProvider router={router} />
      </ToastContextProvider>
    </ColorModeContextProvider>
  );
}

export default App;
