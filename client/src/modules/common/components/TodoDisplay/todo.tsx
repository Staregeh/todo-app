import * as React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  Paper,
  Switch,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  ThemeProvider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ITodo, { IPutTodo } from "../../../models/Todo";
import TodoService from "../../../services/todo.service";
import theme from "../../consts/theme";
import { APP_KEYS } from "../../consts";
import { COLORS, SPACES } from "../../../theme";

const Todo = () => {
  const navigate = useNavigate();
  if (
    localStorage.getItem("JWT") === "" ||
    localStorage.getItem("JWT") === null
  ) {
    navigate(APP_KEYS.ROUTER_KEYS.AUTH);
  }
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const [modal, setModal] = useState(false);
  const todoService = new TodoService();
  const mutateTodo = useMutation((data: IPutTodo) =>
    todoService.update(data, id || "")
  );
  const { data, isLoading, error } = useQuery<ITodo, Error>(
    [APP_KEYS.QUERY_KEYS.TODO, id],
    () => todoService.getById(id || "")
  );
  const handleModal = () => {
    setModal(!modal);
  };
  const formik = useFormik({
    initialValues: {
      title: data?.title,
      text: data?.text,
      isDone: data?.isDone,
      isPrivate: data?.isPrivate,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      await mutateTodo.mutateAsync({
        text: values.text ?? "",
        title: values.title ?? "",
        isDone: values.isDone ?? false,
        isPrivate: values.isPrivate ?? true,
      });
      handleModal();
      await queryClient.refetchQueries([APP_KEYS.QUERY_KEYS.TODO, id]);
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
      <ThemeProvider theme={theme}>
        <Paper
          elevation={8}
          sx={{
            padding: SPACES.l,
            maxWidth: "800px",
            width: "100%",
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <Typography variant="h4" gutterBottom>
            {data?.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {data?.text}
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Typography variant="body1" gutterBottom>
                isDone
              </Typography>
              <Switch checked={data?.isDone} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" gutterBottom>
                Private
              </Typography>
              <Switch checked={data?.isPrivate} />
            </Grid>
          </Grid>
        </Paper>
        <div style={{ marginTop: SPACES.l }}>
          <Button
            onClick={handleModal}
            variant="contained"
            color="primary"
            style={{ marginRight: SPACES.l }}
          >
            Edit
          </Button>
          <Button href="/" variant="contained" color="primary">
            Home
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
                isDone
              </Typography>
              <Switch
                name="isDone"
                checked={formik.values.isDone}
                onChange={formik.handleChange}
              />
              <Typography variant="body1" gutterBottom>
                Private
              </Typography>
              <Switch
                name="isPrivate"
                checked={formik.values.isPrivate}
                onChange={formik.handleChange}
              />
              <br />
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </form>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
};

export default Todo;
