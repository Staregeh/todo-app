import { Response, Request } from "express";
import { generateToken } from "../middleware/isAuth";
import UserService from "../services/user.service";
import { IUser } from "../models/User";

import { CustomRequest } from "../helpers/customRequest";

export class UserController {
  constructor(private userService: UserService) {}

  async getAllUsers(req: Request, res: Response) {
    const user = await this.userService.findAll();
    res.send(user);
  }

  async signUp(req: CustomRequest<IUser>) {
    const result = await this.userService.addUser({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      todos: [],
    });

    if (result.success) {
      return {
        status: 201,
        data: "User was created",
      };
    }
    return {
      status: 500,
      data: "Server error",
    };
  }

  async login(req: CustomRequest<IUser>) {
    const user = await this.userService.getUser(req.body);
    if ("_id" in user) {
      const token = generateToken(user._id.toString());
      return {
        status: 200,
        data: token,
      };
    }
    if ("status" in user) {
      return {
        status: user.status,
        data: user.data,
      };
    }
    return {
      status: 500,
      data: "Something went wrong in login",
    };
  }

  async getUser(req: Request) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return {
        status: 403,
        data: { message: "Invalid token" },
      };
    }
    const userId = await this.userService.getUserIdFromToken(token);
    if (userId) {
      const user = await this.userService.getUserById(userId);
      return {
        status: 200,
        data: {
          name: user?.name,
          email: user?.email,
        },
      };
    }
  }

  async updateUser(req: CustomRequest<IUser>) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return {
        status: 403,
        data: { message: "Invalid token" },
      };
    }
    const userId = await this.userService.getUserIdFromToken(token);
    if (!userId) {
      return {
        status: 500,
        data: { message: "Updating user failed" },
      };
    }
    const updatedUser = await this.userService.updateUser(req.body, userId);
    return {
      status: 200,
      data: {
        message: updatedUser,
      },
    };
  }

  async updatePassword(req: Request) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return {
        status: 403,
        data: { message: "Invalid token" },
      };
    }
    const userId = await this.userService.getUserIdFromToken(token);
    if (!userId) {
      return {
        status: 500,
        data: { message: "Updating password failed" },
      };
    }
    console.log(req.body.old);
    console.log(req.body.new);
    const updatedUser = await this.userService.updateUserPassword(
      userId,
      req.body.old,
      req.body.new
    );
    return {
      status: 200,
      data: updatedUser,
    };
  }
}

const userController = new UserController(new UserService());
export default userController;
