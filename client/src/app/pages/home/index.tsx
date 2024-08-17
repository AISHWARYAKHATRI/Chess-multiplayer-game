import UserAvatar from "@/app/components/UserAvatar";
import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { logout } from "@/app/redux/slices/userSlice";
import { toast } from "sonner";
import { Button } from "@/app/components/Button";
import Link from "next/link";
import { Chess } from "chess.js";
import InputField from "@/app/components/Field";

const Index = () => {
  const [gameId, setGameId] = useState("");
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful");
  };

  return (
    <section className="container">
      <header className="flex justify-between items-center">
        <UserAvatar />
        <div>
          <LogOut className="icon" onClick={handleLogout} />
        </div>
      </header>
      <div className="flex justify-center items-center">
        <Link href="/game/new">
          <Button className="my-4">Play Game</Button>
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <input
          type="text"
          name="test"
          className="text-black"
          onChange={(e) => setGameId(e.target.value)}
        />
        <Link href={`/game/${gameId}`}>
          <Button className="my-4">Join Game</Button>
        </Link>
      </div>
    </section>
  );
};

export default Index;
