// chessSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { Chess } from "chess.js";

interface ChessState {
  fen: string | undefined;
}

const initialState: ChessState = {
  fen: undefined,
};

const chessSlice = createSlice({
  name: "chess",
  initialState,
  reducers: {
    updateFen: (state, action) => {
      state.fen = action.payload;
    },
  },
});

export const { updateFen } = chessSlice.actions;
export default chessSlice.reducer;
