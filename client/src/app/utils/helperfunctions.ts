import { BLACK, WHITE } from "../data/constants";
import { store } from "../redux/store";

export const findOppenentUsername = (game: any) => {
  const userId = store.getState().auth.user?.id;

  if (game?.player_white?.id !== userId) {
    return game?.player_white?.username;
  } else if (game?.player_black?.id !== userId) {
    return game?.player_black?.username;
  }
};

export const findCurrentPlayerColor = (game: any) => {
  const userId = store.getState().auth.user?.id;

  if (game?.player_white?.id === userId) {
    return WHITE;
  } else if (game?.player_black?.id === userId) {
    return BLACK;
  }
};
