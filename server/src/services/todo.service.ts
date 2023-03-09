import { Todo, ITodo } from "../models/ToDo";

export default class TodoService {
  async findAll() {
    const todos = await Todo.find();
    return todos;
  }

  async newTodo(todo: ITodo) {
    const newtodo = new Todo({
      title: todo.title,
      text: todo.text,
      isDone: false,
      isPrivate: todo.isPrivate,
    });
    await newtodo.save();
    return newtodo;
  }

  async todoById(id: string) {
    const todo = await Todo.findById(id);
    return todo;
  }

  async deleteTodoById(id: string) {
    await Todo.findByIdAndDelete(id);
  }

  async updateById(todo: ITodo, id: string) {
    const updatedTodo = await Todo.findById(id);
    if (!updatedTodo) {
      throw new Error("Todo does not exist");
    } else {
      updatedTodo.title = todo.title;
      updatedTodo.text = todo.text;
      updatedTodo.isDone = todo.isDone;
      updatedTodo.isPrivate = todo.isPrivate;
    }
    await updatedTodo.save();
    return updatedTodo;
  }
}
