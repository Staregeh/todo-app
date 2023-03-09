import * as React from "react";
import { Box, Typography, ThemeProvider, Button } from "@mui/material";
import theme from "../../consts/theme";
import { SPACES } from "../../../theme";

const AuthPage = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <Box textAlign="center">
      <Typography variant="h2" color={theme.palette.secondary.main}>
        TODO APP
      </Typography>
      <Box mt={4}>
        <Button
          variant="contained"
          size="large"
          href="/login"
          sx={{ margin: SPACES.l }}
        >
          LOGIN
        </Button>
        <Button
          variant="contained"
          size="large"
          href="/signup"
          sx={{ margin: SPACES.l }}
        >
          SIGN UP
        </Button>
      </Box>
    </Box>
  </Box>
);

export default AuthPage;
