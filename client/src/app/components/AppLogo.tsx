import React from "react";
import Logo from "../../../public/logo.png";
import Link from "next/link";

const AppLogo = ({
  size,
  className,
}: {
  size?: string;
  className?: string;
}) => {
  return (
    <Link href="/">
      <header className={`flex items-end justify-center ${className}`}>
        <img
          src={Logo.src}
          alt="Chess"
          className={size === "sm" ? "w-[18px]" : "w-[35px]"}
        />
        <h1
          className={`${
            size ? "text-2xl" : "text-5xl"
          } text-white font-bold kanit`}
        >
          ChessMate
        </h1>
      </header>
    </Link>
  );
};

export default AppLogo;
