import { useState, useEffect } from "react";
import { AutocompleteInputProps, ZipCode } from "../types";
import { TextFieldWrapper } from "./TextFieldWrapper";
import { isZipCodeValid } from "../utils/inputValidations";
import { useFormContext } from "react-hook-form";
import getZipCodeLocation from "../utils/getZipCodeLocation";

export const AutoComplete = ({ data }: AutocompleteInputProps) => {
  const [suggestions, setSuggestions] = useState<ZipCode | null>();
  const { getValues } = useFormContext();
  const { zip } = getValues();

  useEffect(() => {
    if (zip && data) {
      setSuggestions(getZipCodeLocation(data, zip));
    } else {
      setSuggestions(null);
    }
  }, [zip]);

  return (
    <div className="flex gap-4">
      <TextFieldWrapper {...isZipCodeValid} />

      <div className="flex flex-col flex-0 w-full gap-2">
        <p className="capitalize font-semibold">Place</p>
        <p className="p-5 w-full flex-1 bg-gray-400 font-medium text-gray-800  rounded-md border border-slate-300 placeholder:opacity-60">
          {zip !== "" ? suggestions?.place : ""}
        </p>
      </div>
    </div>
  );
};
