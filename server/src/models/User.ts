import mongoose, { Model, model, Schema } from "mongoose";

export interface IUser {
  name?: string;
  email: string;
  password: string;
  todos: mongoose.Types.ObjectId[];
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Posts",
    },
  ],
});

export const User: Model<IUser> = model<IUser>("User", userSchema);
