import * as React from "react";
import {
  Paper,
  TextField,
  Typography,
  Button,
  ThemeProvider,
} from "@mui/material/";
import { useFormik } from "formik";
import theme from "../../consts/theme";
import { SPACES } from "../../../theme";
import { useMutation } from "react-query";
import UserService from "../../../services/user.service";
import { ILogin } from "../../../models/User";
import { APP_KEYS } from "../../consts";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const userService = new UserService();
  const navigate = useNavigate();
  const { mutateAsync } = useMutation(
    async (data: ILogin) => {
      const token = await userService.login(data);
      return token;
    },
    {
      mutationKey: APP_KEYS.QUERY_KEYS.LOGIN,
    }
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const token: any = await mutateAsync(values);
      localStorage.setItem("JWT", token);
      navigate(APP_KEYS.ROUTER_KEYS.HOME);
    },
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ThemeProvider theme={theme}>
        <Paper
          elevation={8}
          style={{ padding: SPACES.xl, maxWidth: "800px", width: "100%" }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Typography variant="h5" align="center">
              Login
            </Typography>
            <TextField
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: SPACES.l,
              }}
            >
              <Button type="submit" variant="contained">
                Login
              </Button>
            </div>
          </form>
        </Paper>
      </ThemeProvider>
    </div>
  );
};
export default Login;
