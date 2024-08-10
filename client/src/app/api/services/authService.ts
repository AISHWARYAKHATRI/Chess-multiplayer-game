import ApiClient from "../ApiClient";

const login = (data: loginProps) => {
  return ApiClient.post("/users/login", data);
};

const register = (data: registerProps) => {
  return ApiClient.post("/users/register", data);
};

export const authService = {
  login,
  register,
};
