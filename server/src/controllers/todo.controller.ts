import TodoService from "../services/todo.service";
import { ITodo } from "../models/ToDo";
import { CustomRequest } from "../helpers/customRequest";
import UserService from "../services/user.service";

export class TodoController {
  constructor(
    private todoService: TodoService,
    private userService: UserService
  ) {}

  async getAllTodo() {
    const todos = await this.todoService.findAll();
    if (!todos) {
      throw new Error("Todos not found");
    }
    return {
      status: 200,
      data: todos,
    };
  }

  async addTodo(req: CustomRequest<ITodo>) {
    const todo = await this.todoService.newTodo({ ...req.body });
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return {
        status: 403,
        data: { message: "Invalid token" },
      };
    }
    await this.userService.addTodo(token, todo?._id);
    return {
      status: 201,
      data: { message: "New todo was created", data: todo },
    };
  }

  async getTodoById(req: CustomRequest<ITodo>) {
    const todo = await this.todoService.todoById(req.params.id);
    return {
      status: 200,
      data: todo,
    };
  }

  async updateTodo(req: CustomRequest<ITodo>) {
    const todo = await this.todoService.updateById(
      {
        ...req.body,
      },
      req.params.id
    );
    return {
      status: 200,
      data: todo,
    };
  }

  async deleteTodo(req: CustomRequest<ITodo>) {
    await this.todoService.deleteTodoById(req.params.id);
    return {
      status: 200,
      data: { message: "Deleted successfully" },
    };
  }
}

const todoController = new TodoController(new TodoService(), new UserService());
export default todoController;
