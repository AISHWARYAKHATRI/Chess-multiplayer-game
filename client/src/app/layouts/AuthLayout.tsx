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
      <main className="w-[100vw] h-[100vh] relative flex justify-center items-center">
        <section className="bg-[rgba(5,5,5,0.5)] rounded-[12px] border-2 border-gray-800 w-[400px] p-8 flex justify-center items-center flex-col">
          <header className="flex justify-center items-end mb-4">
            <img src={Logo.src} alt="Chess" className="w-[50px]" />
            <h1 className="text-5xl text-cgreen-300 font-bold">Chess</h1>
          </header>
          <div className="w-full">{children}</div>
        </section>
      </main>
    </section>
  );
};

export default AuthLayout;
