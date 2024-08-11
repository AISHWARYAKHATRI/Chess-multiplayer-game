import React from "react";
import { ErrorMessage, Field } from "formik";

type Props = {
  type: string;
  name: string;
  label?: string;
};

const InputField = ({ type, name, label }: Props) => {
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <Field name={name} type={type} className="form-control mt-1" />
      <ErrorMessage
        component="div"
        name={name}
        className="text-sm text-red-400 mt-1"
      />
    </div>
  );
};

export default InputField;
