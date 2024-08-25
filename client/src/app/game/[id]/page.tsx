"use client";
import React, { useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { currentGame, updateFen } from "../../redux/slices/chessSlice";
import { useSocket } from "../../hooks/useSocket";
import { withAuth } from "../../components/withAuth";
import { GAME_EVENTS } from "../../data/constants";
import Game from "../../components/game";
import { findCurrentPlayerColor } from "@/app/utils/helperfunctions";

const Page = () => {
  const fen = useAppSelector((state) => state.chess.fen);
  const dispatch = useAppDispatch();
  const id = useParams().id;

  const socket = useSocket(GAME_EVENTS.JOIN_GAME, { gameId: id });
  const game = useAppSelector((state) => state.chess.game);

  useEffect(() => {
    socket.on(GAME_EVENTS.GAME_JOINED, (gameData) => {
      toast.success(gameData?.message);
    });

    socket.on(GAME_EVENTS.ALREADY_JOINED_GAME, (gameData) => {
      toast.error(gameData?.message);
      dispatch(updateFen(gameData.board));
      dispatch(
        currentGame({
          ...gameData.game,
          currentPlayer: findCurrentPlayerColor(gameData.game),
        })
      );
    });

    socket.on(GAME_EVENTS.JOIN_FAILED, (gameData) => {
      console.log("Game", gameData);
    });

    socket.on(GAME_EVENTS.MOVE_MADE, (gameData) => {
      dispatch(updateFen(gameData.board));
    });
  }, [socket]);

  return fen ? <Game fen={fen} socket={socket} currentGame={game} /> : <></>;
};

export default withAuth(Page);
