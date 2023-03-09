import HttpService, { HttpServiceAuth } from "./http.service";
import IUser, { IChangePassword, ILogin, ISignup } from "../models/User";

class UserService extends HttpService {
  async login(login: ILogin) {
    const url = `api/user/login`;
    return this.post<ILogin>(url, login);
  }

  async signup(data: ISignup) {
    const url = `api/user/signup`;
    return this.post<ISignup>(url, data);
  }
}

export class UserServiceAuth extends HttpServiceAuth {
  async getUser() {
    const url = `api/user/profile`;
    return this.get<IUser>(url);
  }
  async updatePassword(data: IChangePassword) {
    const url = `api/user/password`;
    return this.put<IChangePassword>(url, data);
  }
}

export default UserService;
