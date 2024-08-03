"use client";
import { Button } from "@/app/components/Button";
import { Options } from "@/app/components/Button/types";
import AuthLayout from "@/app/layouts/AuthLayout";
import InputField from "@/app/components/Field";
import React from "react";
import { Formik, Form } from "formik";

const page = () => {
  return (
    <AuthLayout>
      <Formik initialValues={{ name: "" }} onSubmit={() => {}}>
        {() => (
          <Form>
            <InputField type="text" name="name" label="Name" />
            <InputField type="text" name="email" label="Email" />
          </Form>
        )}
      </Formik>
      <Button className="w-full mt-4">Log In</Button>
    </AuthLayout>
  );
};

export default page;
