import { Model, model, Schema } from "mongoose";

export interface ITodo {
  title: string;
  text: string;
  isDone: boolean;
  isPrivate: boolean;
}

const todoSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  isDone: {
    type: Boolean,
  },
  isPrivate: {
    type: Boolean,
  },
});

export const Todo: Model<ITodo> = model<ITodo>("Todo", todoSchema);
