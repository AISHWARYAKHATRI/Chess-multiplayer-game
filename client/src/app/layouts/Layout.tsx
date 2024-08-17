import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  containerStyle?: string;
}

const Layout: React.FC<Props> = ({ children, containerStyle }) => {
  return (
    <section>
      <div className="auth-main">
        <div className="gradient" />
      </div>
      <main className="relative flex justify-center items-center">
        <div className={`${containerStyle}`}>{children}</div>
      </main>
    </section>
  );
};

export default Layout;
