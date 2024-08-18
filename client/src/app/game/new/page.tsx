"use client";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { updateFen } from "../../redux/slices/chessSlice";
import { useSocket } from "../../hooks/useSocket";
import { withAuth } from "../../components/withAuth";
import { GAME_EVENTS } from "../../data/constants";
import Game from "@/app/components/game";

const Page = () => {
  const fen = useAppSelector((state) => state.chess.fen);
  const dispatch = useAppDispatch();
  const socket = useSocket(GAME_EVENTS.CREATE_GAME);

  useEffect(() => {
    socket.on(GAME_EVENTS.GAME_CREATED, (data) => {
      toast.success(data?.message);
    });
    socket.on(GAME_EVENTS.ONGOING_GAME, (data) => {
      dispatch(updateFen(data.board));
      toast.error(data?.message);
    });
    socket.on(GAME_EVENTS.MOVE_MADE, (data) => {
      console.log("mOVE MADE", data);
    });
  }, [socket, dispatch]);

  // Debug log to check when fen changes
  useEffect(() => {
    console.log("Updated fen:", fen);
  }, [fen]);

  return fen ? <Game fen={fen} socket={socket} /> : <></>;
};

export default withAuth(Page);
