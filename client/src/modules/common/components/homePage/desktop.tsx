import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import ITodo from "../../../models/Todo";
import TodoService from "../../../services/todo.service";
import theme from "../../consts/theme";
import { APP_KEYS } from "../../consts";
import { SPACES } from "../../../theme";

export default function Desktop() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  if (
    localStorage.getItem("JWT") === "" ||
    localStorage.getItem("JWT") === undefined
  ) {
    navigate(APP_KEYS.ROUTER_KEYS.AUTH);
  }
  const { data, isLoading, error } = useQuery<ITodo[], Error>(
    APP_KEYS.QUERY_KEYS.TODOS,
    async () => {
      const todoService = new TodoService();
      const todos = await todoService.getAll();
      return todos;
    }
  );

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

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      deleteTodo.mutate(id);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div
      style={{ width: "80%", margin: "0 auto", paddingTop: SPACES.paddingTop }}
    >
      <ThemeProvider theme={theme}>
        <List
          sx={{ bgcolor: "background.paper" }}
          subheader={<ListSubheader>Todos</ListSubheader>}
        >
          <ListItem>
            <ListItemText primary="Title" sx={{ width: "25%" }} />
            <ListItemText primary="Text" sx={{ width: "50%" }} />
            <ListItemText primary="Actions" sx={{ width: "25%" }} />
          </ListItem>
          {data?.map((todo) => (
            <ListItem key={todo._id}>
              <ListItemText
                primary={
                  <Link to={`/${todo._id}`} style={{ textDecoration: "none" }}>
                    {todo.title}
                  </Link>
                }
                sx={{ width: "25%" }}
              />
              <ListItemText primary={todo.text} sx={{ width: "50%" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "25%",
                }}
              >
                <Button href={`/${todo._id}`} variant="contained">
                  View
                </Button>
                <Button
                  onClick={() => handleDelete(todo._id)}
                  variant="contained"
                >
                  Delete
                </Button>
                <Switch edge="end" checked={todo.isDone} />
              </div>
            </ListItem>
          ))}
        </List>
      </ThemeProvider>
    </div>
  );
}
