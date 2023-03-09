import { HttpServiceAuth } from "./http.service";
import ITodo, { IPutTodo } from "../models/Todo";

class TodoService extends HttpServiceAuth {
  async getAll(): Promise<ITodo[]> {
    return this.get<ITodo[]>("api/todos");
  }

  async getById(id: string): Promise<ITodo> {
    return this.get<ITodo>(`api/todos/${id}`);
  }

  async create(todo: IPutTodo): Promise<IPutTodo> {
    return this.post<IPutTodo>("api/todos", todo);
  }

  async update(todo: IPutTodo, id: string): Promise<IPutTodo> {
    return this.put<IPutTodo>(`api/todos/${id}`, todo);
  }

  async deleteById(id: string): Promise<void> {
    await this.delete<void>(`api/todos/${id}`);
  }
}

export default TodoService;
