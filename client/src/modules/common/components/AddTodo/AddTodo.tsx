import * as React from "react";
import {
  Paper,
  TextField,
  Typography,
  Button,
  Switch,
  ThemeProvider,
} from "@mui/material/";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { IPutTodo } from "../../../models/Todo";
import TodoService from "../../../services/todo.service";
import theme from "../../consts/theme";
import { APP_KEYS } from "../../consts";
import { SPACES } from "../../../theme";

const AddTodo = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("JWT") === "") {
    navigate(APP_KEYS.ROUTER_KEYS.AUTH);
  }
  const todoService = new TodoService();
  const mutateTodo = useMutation((data: IPutTodo) => todoService.create(data));
  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
      isDone: false,
      isPrivate: true,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      await mutateTodo.mutateAsync({
        text: values.text ?? "",
        title: values.title ?? "",
        isDone: values.isDone ?? false,
        isPrivate: values.isPrivate ?? true,
      });
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
            <TextField
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              name="text"
              label="Text"
              value={formik.values.text}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
              minRows={4}
              maxRows={8}
            />
            <Typography variant="body1" gutterBottom>
              Private
            </Typography>
            <Switch />
            <br />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </Paper>
      </ThemeProvider>
    </div>
  );
};
export default AddTodo;
