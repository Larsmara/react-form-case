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
    if (zip && zip.length >= 4 && data) {
      setSuggestions(getZipCodeLocation(data, zip));
    } else {
      setSuggestions(null);
    }
  }, [zip]);

  return (
    <div className="flex gap-4">
      <TextFieldWrapper {...isZipCodeValid} />

      <div className="form-control w-full max-w-xs">
        <label htmlFor="zipCode" className="label capitalize text-accent">
          Place
        </label>
        <input
          id="zipCode"
          type="text"
          value={suggestions ? suggestions?.place : ""}
          className="input input-bordered w-full max-w-xs !cursor-default"
          disabled
        />
      </div>
    </div>
  );
};
