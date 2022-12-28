import exp from "constants";

export interface UserRegisterModel {
  email: string;
  password: string;
}

export interface UserPasswordChangeModel {
  oldPassword: string;
  newPassword: string;
}

export interface AddTodoModel {
  title: string;
}

export interface DeleteOrMarkTodoCompleteModel {
  id: number;
}

export interface PasswordUpdateModel {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateTodoModel {
  id: number;
  newTitle: string;
}
