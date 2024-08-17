import UserAvatar from "@/app/components/UserAvatar";
import React from "react";
import { LogOut } from "lucide-react";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { logout } from "@/app/redux/slices/userSlice";
import { toast } from "sonner";
import { Button } from "@/app/components/Button";
import Link from "next/link";
import { Chess } from "chess.js";

const Index = () => {
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
        <Link href="/game">
          <Button className="my-4">Play Game</Button>
        </Link>
      </div>
    </section>
  );
};

export default Index;
