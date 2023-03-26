import { Container } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar";

import { router } from "./routes";

function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <Navbar />
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;
