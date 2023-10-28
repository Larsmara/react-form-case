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
  const {
    register,
    formState: { errors },
    getValues,
    watch,
  } = useFormContext();

  const inputErrors = findInputError(errors, name) as InputError;
  const isInvalid: boolean = isFormValid(inputErrors);

  useEffect(() => {
    if (onChange) {
      const values: string | number = getValues(name);
      onChange(values);
    }
  }, [watch()]);

  return (
    <div className="flex flex-col w-full gap-2">
      <label htmlFor={id} className="capitalize font-semibold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="p-5 text-gray-800 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60"
        {...register(name, validation)}
      />
      {isInvalid && (
        <p className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md">
          {inputErrors.error.message}
        </p>
      )}
    </div>
  );
}
