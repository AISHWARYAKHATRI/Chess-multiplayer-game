"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Chess } from "chess.js";
import { updateFen } from "../../redux/slices/chessSlice";
import { useSocket } from "../../hooks/useSocket";
import { withAuth } from "../../components/withAuth";
import { GAME_EVENTS } from "../../data/constants";
import { toast } from "sonner";
import Game from "@/app/components/game";

const Page = () => {
  const fen = useAppSelector((state) => state.chess.fen);
  const dispatch = useAppDispatch();
  const socket = useSocket(GAME_EVENTS.JOIN_GAME, { gameId: 13 });

  useEffect(() => {
    socket.on(GAME_EVENTS.GAME_JOINED, (gameData) => {
      toast.success(gameData?.message);
    });

    socket.on(GAME_EVENTS.ALREADY_JOINED_GAME, (gameData) => {
      console.log(gameData);

      toast.error(gameData?.message);
      dispatch(updateFen(gameData.board));
    });

    socket.on(GAME_EVENTS.JOIN_FAILED, (gameData) => {
      console.log("Game", gameData);
    });

    socket.on(GAME_EVENTS.MOVE_MADE, (gameData) => {
      dispatch(updateFen(gameData.board));
    });
  }, [socket]);

  return fen ? <Game fen={fen} socket={socket} /> : <></>;
};

export default withAuth(Page);
