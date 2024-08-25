import ApiClient from "../ApiClient";

const getGames = () => {
  return ApiClient.get("/users/games");
};

export const userService = {
  getGames,
};
