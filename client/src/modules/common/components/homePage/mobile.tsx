import * as React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import ITodo from "../../../models/Todo";
import TodoService from "../../../services/todo.service";
import { SPACES } from "../../../theme";
import { APP_KEYS } from "../../consts";
import MobileTodo from "./mobileComponents/MobileTodo";

const MobileTodos = () => {
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
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div style={{ paddingTop: SPACES.paddingTop }}>
      {data?.map((todo) => (
        <MobileTodo {...todo} />
      ))}
    </div>
  );
};

export default MobileTodos;
