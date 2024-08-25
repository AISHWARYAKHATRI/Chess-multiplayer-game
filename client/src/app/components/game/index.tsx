"use client";
import React from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Square, WHITE } from "chess.js";
import { isEmpty } from "lodash";

import { GAME_EVENTS } from "@/app/data/constants";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import Layout from "@/app/layouts/Layout";
import { updateFen } from "@/app/redux/slices/chessSlice";
import UserAvatar from "../UserAvatar";
import { findOppenentUsername } from "@/app/utils/helperfunctions";

const Index = ({ fen, socket, currentGame }: any) => {
  const dispatch = useAppDispatch();

  const handleMove = (source: Square, target: Square) => {
    try {
      const game = new Chess(fen);
      const move = game.move({ from: source, to: target, promotion: "q" });

      if (move.color !== currentGame?.currentPlayer) {
        return false;
      }

      if (move) {
        const newFen = game.fen();
        dispatch(updateFen(newFen));
        socket.emit(GAME_EVENTS.MOVE, { from: source, to: target });

        if (game.isAttacked(source, WHITE)) {
          console.log("Piece attacked:", source);
        }
        return true;
      } else {
        console.log("Invalid move:", { from: source, to: target });
        return false;
      }
    } catch (error) {
      console.error("Error handling move:", error);
      return false;
    }
  };

  return (
    <Layout containerStyles="m-auto">
      <div className="flex flex-col">
        <UserAvatar
          oppenentUsername={findOppenentUsername(currentGame)}
          oppenent={true}
        />
        <main className="lg:w-[530px] p-2 lg:p-0 my-3">
          <Chessboard
            position={fen}
            id="BasicBoard"
            onPieceDrop={handleMove}
            boardOrientation={
              currentGame?.currentPlayer === WHITE ? "white" : "black"
            }
            arePiecesDraggable={!isEmpty(currentGame)}
          />
        </main>
        <UserAvatar />
      </div>
    </Layout>
  );
};

export default Index;
