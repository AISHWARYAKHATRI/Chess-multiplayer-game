"use client";
import { Button } from "@/app/components/Button";
import AuthLayout from "@/app/layouts/AuthLayout";
import InputField from "@/app/components/Field";
import React from "react";
import { Formik, Form } from "formik";
import Link from "next/link";

const page = () => {
  return (
    <AuthLayout>
      <Formik initialValues={{ name: "" }} onSubmit={() => {}}>
        {() => (
          <Form>
            <InputField type="text" name="username" label="Username" />
            <InputField type="text" name="email" label="Email" />
            <InputField type="password" name="email" label="Password" />
            <InputField type="password" name="email" label="Confirm Password" />
          </Form>
        )}
      </Formik>
      <Button className="w-full mt-4">Register</Button>
      <Link href="/auth/login">
        <Button.Plain className="w-full mt-4">Login</Button.Plain>
      </Link>
    </AuthLayout>
  );
};

export default page;
