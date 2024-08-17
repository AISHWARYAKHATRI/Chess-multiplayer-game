"use client";
import { Button } from "@/app/components/Button";
import AuthLayout from "@/app/layouts/AuthLayout";
import InputField from "@/app/components/Field";
import React from "react";
import { Formik, Form } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { REQUIRED_FIELD } from "@/app/data/constants";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { registerUser } from "@/app/redux/slices/userSlice";
import { withoutAuth } from "@/app/components/withoutAuth";

const Page = () => {
  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(REQUIRED_FIELD),
    lastName: Yup.string().required(REQUIRED_FIELD),
    username: Yup.string().required(REQUIRED_FIELD),
    email: Yup.string().email("Must be a valid email").required(REQUIRED_FIELD),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password cannot be longer than 20 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one digit")
      .matches(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/,
        "Password must contain at lease one special character"
      )
      .required(REQUIRED_FIELD),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required(REQUIRED_FIELD),
  });

  return (
    <AuthLayout>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(registerUser({ ...values, country: "" }));
        }}
      >
        {() => (
          <Form>
            <InputField type="text" name="firstName" label="Firstname" />
            <InputField type="text" name="lastName" label="Lastname" />
            <InputField type="text" name="username" label="Username" />
            <InputField type="email" name="email" label="Email" />
            <InputField type="password" name="password" label="Password" />
            <InputField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
            />
            <Button className="w-full mt-4" type="submit" disabled={loading}>
              Register
            </Button>
            <Link href="/auth/login">
              <Button.Plain className="w-full mt-4" disabled={loading}>
                Login
              </Button.Plain>
            </Link>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default withoutAuth(Page);
