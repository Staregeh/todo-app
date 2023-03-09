interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  todos: [];
}

export interface ILogin {
  email: string;
  password: string;
  token?: string;
}
export interface ISignup {
  name: string;
  email: string;
  password: string;
}

export interface IChangePassword {
  old: string;
  new: string;
}

export default IUser;
