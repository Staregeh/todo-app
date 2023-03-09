import { createTheme, ThemeOptions } from "@mui/material/styles";
import { COLORS } from "../../theme";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: COLORS.primary,
    },
    secondary: {
      main: COLORS.secondary,
    },
  },
  typography: {
    fontFamily: "Arial",
  },
};

const theme = createTheme(themeOptions);

export default theme;
