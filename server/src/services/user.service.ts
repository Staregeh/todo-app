import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { IUser, User } from "../models/User";

export default class UserService {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async comparePasswords(password: string, hashedPassword: string) {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  }

  getUserIdFromToken(token: string): string | null {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");
      return decoded.userId;
    } catch (err) {
      return null;
    }
  }

  async addTodo(token: string, todoId: mongoose.Types.ObjectId) {
    const userId = this.getUserIdFromToken(token);
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("No user was found in database");
    }
    user.todos.push(todoId);
    user.save();
  }

  async findAll() {
    return "Users";
  }

  async getUser(user: IUser) {
    const resUser = await User.findOne({ email: user.email });
    if (resUser) {
      const passwordMatch = await bcrypt.compare(
        user.password,
        resUser?.password
      );
      if (passwordMatch) {
        return resUser;
      }
      return { status: 403, data: { message: "Wrong password" } };
    }
    return { status: 403, data: { message: "No user with this email" } };
  }

  async getUserById(id: string) {
    const user = await User.findById(id);
    return user;
  }

  async addUser(user: IUser) {
    const password = await this.hashPassword(user.password);
    const newuser = new User({
      name: user.name,
      email: user.email,
      password,
      todos: user.todos,
    });
    await newuser.save();
    return { success: true };
  }

  async updateUser(user: IUser, id: string) {
    const updatedUser = await User.findById(id);
    if (updatedUser) {
      updatedUser.name = user.name;
      await updatedUser.save();
      return updatedUser;
    }
    throw new Error("user was not found");
  }

  async updateUserPassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ) {
    const newHashedPassword = await this.hashPassword(newPassword);
    const user = await this.getUserById(userId);
    if (user) {
      const passwordMatch = await bcrypt.compare(
        oldPassword,
        user.password.toString()
      );
      if (passwordMatch) {
        user.password = newHashedPassword;
        await user.save();
        return user;
      }
      throw new Error("Wrong password!");
    }
    throw new Error("user was not found");
  }
}
