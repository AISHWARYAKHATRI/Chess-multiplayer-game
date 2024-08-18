"use client";
import { GAME_EVENTS } from "@/app/data/constants";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import Layout from "@/app/layouts/Layout";
import { updateFen } from "@/app/redux/slices/chessSlice";
import { Chess, Square, WHITE } from "chess.js";
import React from "react";
import { Chessboard } from "react-chessboard";

const Index = ({ fen, socket }: any) => {
  const dispatch = useAppDispatch();

  const handleMove = (source: Square, target: Square) => {
    try {
      const game = new Chess(fen);
      const move = game.move({ from: source, to: target, promotion: "q" });

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
    <Layout containerStyle="flex justify-center items-center h-[100vh]">
      <main className="lg:w-[530px] p-2 lg:p-0">
        <Chessboard position={fen} id="BasicBoard" onPieceDrop={handleMove} />
      </main>
    </Layout>
  );
};

export default Index;
