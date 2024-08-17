"use client";
import { Button } from "@/app/components/Button";
import AuthLayout from "@/app/layouts/AuthLayout";
import InputField from "@/app/components/Field";
import React from "react";
import { Formik, Form } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { REQUIRED_FIELD } from "@/app/data/constants";
import { LoginProps } from "@/app/api/services/authService";
import { loginUser } from "@/app/redux/slices/userSlice";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { withoutAuth } from "@/app/components/withoutAuth";

const Page = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(REQUIRED_FIELD),
    password: Yup.string().required(REQUIRED_FIELD),
  });
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);

  return (
    <AuthLayout>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values: LoginProps) => {
          dispatch(loginUser(values)).then(() => {});
        }}
        validationSchema={validationSchema}
      >
        {() => (
          <Form>
            <InputField type="text" name="username" label="Username / Email" />
            <InputField type="password" name="password" label="Password" />
            <Button className="w-full mt-4" type="submit" disabled={loading}>
              Log In
            </Button>
            <Link href="/auth/register">
              <Button.Plain className="w-full mt-4" disabled={loading}>
                Register
              </Button.Plain>
            </Link>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default withoutAuth(Page);
