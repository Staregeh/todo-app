import * as React from "react";
import {
  Paper,
  Typography,
  Grid,
  Switch,
  Link,
  ThemeProvider,
  Button,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import ITodo from "../../../../models/Todo";
import TodoService from "../../../../services/todo.service";
import theme from "../../../consts/theme";
import { APP_KEYS } from "../../../consts";

import { SPACES } from "../../../../theme";

const MobileTodo = ({ _id, title, text, isDone }: ITodo) => {
  const queryClient = useQueryClient();

  const deleteTodo = useMutation(
    async (id: string) => {
      const todoService = new TodoService();
      await todoService.deleteById(id);
    },
    {
      onSuccess: async () => {
        await queryClient.refetchQueries([APP_KEYS.QUERY_KEYS.TODOS]);
      },
    }
  );

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      deleteTodo.mutate(id);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={8}
        sx={{
          margin: SPACES.xl,
          padding: SPACES.l,
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <Link variant="h4" href={`/${_id}`} gutterBottom>
          {title}
        </Link>
        <Typography variant="body1" gutterBottom>
          {text}
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <Typography variant="body1" gutterBottom>
              isDone
            </Typography>
            <Switch checked={isDone} />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" gutterBottom>
              Private
            </Typography>
            <Switch />
          </Grid>
          <Grid item xs={4}>
            <Button onClick={() => handleDelete(_id)} variant="contained">
              Delete
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
};
export default MobileTodo;
