import ApiClient from "../ApiClient";

export interface LoginProps {
  username: string;
  password: string;
}

export interface RegisterProps {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country?: string;
}

const login = (data: LoginProps) => {
  return ApiClient.post("/users/login", data);
};

const register = (data: RegisterProps) => {
  return ApiClient.post("/users/register", data);
};

export const authService = {
  login,
  register,
};
