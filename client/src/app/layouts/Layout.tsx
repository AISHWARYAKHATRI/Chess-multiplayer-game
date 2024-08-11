import React, { ReactNode } from "react";
import Logo from "../../../public/logo.png";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <section>
      <div className="auth-main">
        <div className="gradient" />
      </div>
      <main className="relative flex justify-center items-center">
        <div className="w-full">{children}</div>
      </main>
    </section>
  );
};

export default Layout;
