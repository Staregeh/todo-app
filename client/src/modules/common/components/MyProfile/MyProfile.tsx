import {
  Paper,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import theme from "../../consts/theme";
import { SPACES, COLORS } from "../../../theme";
import { useQuery, useMutation } from "react-query";
import IUser, { IChangePassword } from "../../../models/User";
import { APP_KEYS } from "../../consts";
import { UserServiceAuth } from "../../../services/user.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";

export default function MyProfile() {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  if (
    localStorage.getItem("JWT") === "" ||
    localStorage.getItem("JWT") === undefined
  ) {
    navigate(APP_KEYS.ROUTER_KEYS.AUTH);
  }
  const userService = new UserServiceAuth();
  const mutateUser = useMutation((data: IChangePassword) =>
    userService.updatePassword(data)
  );
  const { data, error, isLoading } = useQuery<IUser, Error>(
    APP_KEYS.QUERY_KEYS.PROFILE,
    async () => {
      const user = await userService.getUser();
      return user;
    }
  );
  const formik = useFormik({
    initialValues: {
      old: "",
      password: "",
      confirm: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      await mutateUser.mutateAsync({ old: values.old, new: values.password });
      handleModal();
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  const handleModal = () => {
    setModal(!modal);
  };
  const logout = () => {
    localStorage.setItem("JWT", "");
    navigate(APP_KEYS.ROUTER_KEYS.AUTH);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: SPACES.l,
          maxWidth: "800px",
          width: "100%",
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: SPACES.l }}>
          My Profile
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: SPACES.s }}>
          Name: {data?.name}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: SPACES.s }}>
          Email: {data?.email}
        </Typography>
      </Paper>
      <div style={{ marginTop: SPACES.l }}>
        <Button
          onClick={handleModal}
          variant="contained"
          color="primary"
          style={{ marginRight: SPACES.l }}
        >
          Change Password
        </Button>
        <Button href="/" variant="contained" color="primary">
          Home
        </Button>
        <Button
          onClick={logout}
          variant="contained"
          color="primary"
          style={{ marginLeft: SPACES.l }}
        >
          Log Out
        </Button>
      </div>
      <Modal
        open={modal}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            backgroundColor: COLORS.white,
            padding: SPACES.l,
            border: "1px solid black",
            borderRadius: "8px",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
            width: "80%",
            margin: "auto",
            marginTop: SPACES.marginTopEditBox,
            marginBottom: SPACES.marginTopEditBox,
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <TextField
              name="old"
              label="Old Password"
              type="password"
              value={formik.values.old}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              name="password"
              label="New Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              name="confirm"
              label="Confirm New Password"
              type="password"
              value={formik.values.confirm}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button type="submit" variant="contained" sx={{ margin: SPACES.s }}>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
