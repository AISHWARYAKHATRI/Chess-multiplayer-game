"use client";
import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { Chessboard } from "react-chessboard";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { Chess, Square, WHITE } from "chess.js";
import { updateFen } from "../redux/slices/chessSlice";

const Page = () => {
  const fen = useAppSelector((state) => state.chess.fen);
  const [chess, setChess] = useState(new Chess(fen));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateFen(chess.fen()));
  }, []);

  const handleMove = (source: Square, target: Square) => {
    try {
      const game = new Chess(fen);
      const move = game.move({ from: source, to: target, promotion: "q" });
      // If the move is valid
      if (move) {
        dispatch(updateFen(game.fen()));
        setChess(game);
        if (game.isAttacked(source, WHITE)) {
          console.log(true);
        }
        return true;
      } else return false;
    } catch (error) {
      console.log(error);

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

export default Page;
