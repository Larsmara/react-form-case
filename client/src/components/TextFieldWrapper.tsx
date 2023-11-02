import { useEffect } from "react";
import { InputError } from "../types";
import { findInputError } from "../utils/findInputError";
import { isFormValid } from "../utils/isFormValid";
import { useFormContext } from "react-hook-form";

interface TextFieldWrapperProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  validation: any;
  id: string;
  onChange?: Function;
}

export function TextFieldWrapper({
  label,
  name,
  type,
  placeholder,
  id,
  validation,
  onChange,
}: TextFieldWrapperProps) {
  const { register, formState, getValues, watch } = useFormContext();

  const inputErrors = findInputError(formState.errors, name) as InputError;
  const isInvalid: boolean = isFormValid(inputErrors);

  useEffect(() => {
    if (onChange) {
      const values: string | number = getValues(name);
      onChange(values);
    }
  }, [watch()]);

  return (
    <div className="form-control w-full max-w-xs">
      <label htmlFor={id} className="label capitalize text-accent">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`input w-full max-w-xs input-bordered ${
          isInvalid ? "input-error" : ""
        }`}
        {...register(name, validation)}
      />
      {isInvalid && (
        <p className="label">
          <span className="label-text-alt text-error">
            {inputErrors.error.message}
          </span>
        </p>
      )}
    </div>
  );
}
