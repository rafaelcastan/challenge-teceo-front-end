import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { UseColorMode } from "../../context/color-mode";
import { useTheme } from "@mui/material/styles";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function Navbar() {
  const theme = useTheme();
  const { toggleColorMode } = UseColorMode();
  return (
    <Box flexGrow={1}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" flexGrow={1}>
            ViaCEP
          </Typography>
          <DarkModeSwitch
            checked={theme.palette.mode === "dark"}
            onChange={toggleColorMode}
            size={25}
          />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}
