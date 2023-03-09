import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Switch from "@mui/material/Switch";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { Typography, Button, Grid } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import ITodo from "../../../../models/Todo";
import TodoService from "../../../../services/todo.service";
import theme from "../../../consts/theme";
import { APP_KEYS } from "../../../consts";
import { SIZES, SPACES } from "../../../../theme";
import { SIZES as fontSIZES } from "../../../../theme/fonts.const";

const TodoTab = ({ _id, title, text, isDone }: ITodo) => {
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
      <Card
        sx={{
          minWidth: SIZES.todoCardMinWidth,
          maxWidth: SIZES.todoCardMaxWidth,
          height: SIZES.todoCardHeight,
          backgroundColor: theme.palette.secondary.main,
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: fontSIZES.l }}
            color="text.secondary"
            gutterBottom
          >
            Todo
          </Typography>
          <Typography sx={{ mb: SPACES.l }} color="text.primary">
            {title}
          </Typography>
          <Typography variant="body2">{text}</Typography>
        </CardContent>
        <CardActions>
          <Grid container spacing={2}>
            <Grid item md={3}>
              <Typography>isDone</Typography>
            </Grid>
            <Grid item md={3}>
              <Switch checked={isDone} />
            </Grid>
            <Grid item md={3}>
              <Typography>Private</Typography>
            </Grid>
            <Grid item md={3}>
              <Switch checked={isDone} />
            </Grid>
            <Grid item md={6}>
              <Button href={`/${_id}`} variant="contained">
                View
              </Button>
            </Grid>
            <Grid item md={6}>
              <Button onClick={() => handleDelete(_id)} variant="contained">
                Delete
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};

export default TodoTab;
