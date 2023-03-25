import { useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { themeOptions } from "../../styles/themes/theme";

interface ColorModeContextProviderProps {
  children: ReactNode;
}

type ModeTypes = "light" | "dark";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const savedTheme = localStorage.getItem("preferedTheme") as ModeTypes;

export function ColorModeContextProvider({ children }: ColorModeContextProviderProps) {
  const userPreferedMode = useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light";
  const [mode, setMode] = useState<ModeTypes>(savedTheme ?? userPreferedMode);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        localStorage.setItem("preferedTheme", newMode);
      },
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          ...themeOptions.palette,
          mode,
        },
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              input: {
                "&:-webkit-autofill": {
                  borderRadius: "0",
                  WebkitBoxShadow: `0 0 0 100px ${mode === "dark" ? "#121212" : "#FFFFFF"} inset`,
                  WebkitTextFillColor: `${mode === "dark" ? "#FFFFFF" : "#121212"}`,
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  useEffect(() => {
    if (!savedTheme) {
      localStorage.setItem("preferedTheme", userPreferedMode);
    }
  }, [userPreferedMode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const UseColorMode = () => useContext(ColorModeContext);
