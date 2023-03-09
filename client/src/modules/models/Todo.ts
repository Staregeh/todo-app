interface ITodo {
  _id: string;
  title: string;
  text: string;
  isDone: boolean;
  isPrivate: boolean;
}
export interface IPutTodo {
  title: string;
  text: string;
  isDone: boolean;
  isPrivate: boolean;
}

export default ITodo;
