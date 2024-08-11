import UserAvatar from "@/app/components/UserAvatar";
import React from "react";
import { LogOut } from "lucide-react";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { logout } from "@/app/redux/slices/userSlice";

const Index = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
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
