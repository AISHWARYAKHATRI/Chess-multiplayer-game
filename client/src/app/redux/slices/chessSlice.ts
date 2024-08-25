// chessSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { Chess } from "chess.js";

interface ChessState {
  fen: string | undefined;
  game: any | undefined;
}

const initialState: ChessState = {
  fen: undefined,
  game: {},
};

const chessSlice = createSlice({
  name: "chess",
  initialState,
  reducers: {
    updateFen: (state, action) => {
      state.fen = action.payload;
    },
    currentGame: (state, action) => {
      state.game = action.payload;
    },
  },
});

export const { updateFen, currentGame } = chessSlice.actions;
export default chessSlice.reducer;
