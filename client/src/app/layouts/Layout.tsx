import React, { ReactNode } from "react";

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
        <div className="w-full flex justify-center items-center py-20 px-10 lg:px-64">
          {children}
        </div>
      </main>
    </section>
  );
};

export default Layout;
