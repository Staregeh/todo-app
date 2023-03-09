import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material";
import theme from "../../consts/theme";
import { APP_KEYS } from "../../consts";

export default function Header() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Button color="inherit" href={APP_KEYS.ROUTER_KEYS.ADD}>
              Add new todo
            </Button>
            <Button color="inherit" href={APP_KEYS.ROUTER_KEYS.PROFILE}>
              My Profile
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
