"use client";
import { ComponentType, useEffect } from "react";
import { redirect } from "next/navigation";
import { isEmpty } from "lodash";

import { useAppSelector } from "../hooks/useAppSelector";

export const withoutAuth = (Component: ComponentType) => {
  return function WithoutAuth(props: any) {
    const user = useAppSelector((state) => state.auth.user);
    useEffect(() => {
      if (!isEmpty(user)) {
        redirect("/");
      }
    }, [user]);
    return <Component {...props} />;
  };
};
