import React from "react";

type Props = {
  type: string;
  name: string;
  label?: string;
  value: any;
  onChange: (value: any) => void;
};

const Input = ({ type, name, label, value, onChange }: Props) => {
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        className="form-control mt-1"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
