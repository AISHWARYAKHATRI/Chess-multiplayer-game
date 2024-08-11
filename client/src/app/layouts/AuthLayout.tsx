import React, { ReactNode } from "react";
import Logo from "../../../public/logo.png";

interface Props {
  children: ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <section>
      <div className="auth-main">
        <div className="gradient" />
      </div>
      <main className="relative flex justify-center items-center py-10">
        <section className="bg-[rgba(5,5,5,0.5)] rounded-[12px] border-2 border-gray-800 w-[400px] p-8 flex justify-center items-center flex-col">
          <header className="flex items-end justify-center mb-9">
            <img src={Logo.src} alt="Chess" className="w-[35px]" />
            <h1 className="text-5xl text-white font-bold kanit">ChessMate</h1>
          </header>
          <div className="w-full">{children}</div>
        </section>
      </main>
    </section>
  );
};

export default AuthLayout;
