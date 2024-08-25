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
    </section>
  );
};

export default Index;
