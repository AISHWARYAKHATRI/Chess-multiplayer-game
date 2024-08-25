"use client";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { currentGame, updateFen } from "../../redux/slices/chessSlice";
import { useSocket } from "../../hooks/useSocket";
import { withAuth } from "../../components/withAuth";
import { GAME_EVENTS } from "../../data/constants";
import Game from "@/app/components/game";
import { findCurrentPlayerColor } from "@/app/utils/helperfunctions";

const Page = () => {
  const fen = useAppSelector((state) => state.chess.fen);
  const dispatch = useAppDispatch();
  const socket = useSocket(GAME_EVENTS.CREATE_GAME);
  const game = useAppSelector((state) => state.chess.game);

  useEffect(() => {
    socket.on(GAME_EVENTS.GAME_CREATED, (data) => {
      toast.success(data?.message);
      dispatch(updateFen(data.board));
    });
    socket.on(GAME_EVENTS.ONGOING_GAME, (data) => {
      dispatch(updateFen(data.board));
      dispatch(
        currentGame({
          ...data.game,
          currentPlayer: findCurrentPlayerColor(data.game),
        })
      );
      toast.error(data?.message);
    });
    socket.on(GAME_EVENTS.MOVE_MADE, (data) => {
      dispatch(updateFen(data.board));
    });
    socket.on(GAME_EVENTS.GAME_JOINED, (data) => {
      dispatch(
        currentGame({
          ...data.game,
          currentPlayer: findCurrentPlayerColor(data.game),
        })
      );
    });
  }, [socket, dispatch]);

  return fen ? <Game fen={fen} socket={socket} currentGame={game} /> : <></>;
};

export default withAuth(Page);
