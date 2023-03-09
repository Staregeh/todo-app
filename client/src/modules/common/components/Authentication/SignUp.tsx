import React from "react";
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
import { APP_KEYS } from "../../consts";
import UserService from "../../../services/user.service";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { ISignup } from "../../../models/User";

const SignUp = () => {
  const userService = new UserService();
  const navigate = useNavigate();
  const { mutateAsync } = useMutation(
    async (data: ISignup) => {
      const token = await userService.signup(data);
      return token;
    },
    {
      mutationKey: APP_KEYS.QUERY_KEYS.SIGNUP,
    }
  );
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      await mutateAsync({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      navigate(APP_KEYS.ROUTER_KEYS.LOGIN);
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
              SIGN UP
            </Typography>
            <TextField
              name="name"
              label="Name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
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
            <TextField
              name="confirm"
              label="Confirm password"
              type="password"
              value={formik.values.confirm}
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
                Sign Up
              </Button>
            </div>
          </form>
        </Paper>
      </ThemeProvider>
    </div>
  );
};
export default SignUp;
