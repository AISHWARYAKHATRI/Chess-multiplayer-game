"use client";
import { ComponentType, useEffect } from "react";
import { isEmpty } from "lodash";
import { redirect } from "next/navigation";

import { useAppSelector } from "../hooks/useAppSelector";

export const withAuth = (Component: ComponentType) => {
  return function WithAuth(props: any) {
    const user = useAppSelector((state) => state.auth.user);
    console.log(user);

    useEffect(() => {
      if (isEmpty(user)) {
        redirect("/auth/login");
      }
    }, [user]);
    return <Component {...props} />;
  };
};
