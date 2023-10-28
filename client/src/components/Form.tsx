import { TextFieldWrapper } from "./TextFieldWrapper";
import { Button } from "react-aria-components";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import {
  isNameValid,
  isEmailValid,
  isPhoneValid,
} from "../utils/inputValidations";
import { AutoComplete } from "./AutoComplete";
import { FormDataExtended, FormProps, FormSchema } from "../types";
import getZipCodeLocation from "../utils/getZipCodeLocation";
import { postForm, postToCase } from "../api";

export const Form = ({ zipCodes }: FormProps) => {
  const methods = useForm<FormDataExtended>();
  const [success, setSuccess] = useState(false);

  const onSubmit: SubmitHandler<FormDataExtended> = methods.handleSubmit(
    async (data) => {
      const zip = getZipCodeLocation(zipCodes, data.zip);
      const mappedData: FormSchema = {
        ...data,
        zip,
        applicant: "Lars-Martin Antonsen",
      };

      try {
        const res = await postForm(mappedData);
        console.log(res);
        if (res === 200) {
          await postToCase(mappedData);
          methods.reset();
          setSuccess(true);
        }
      } catch (error) {
        console.error(error);
        setSuccess(false);
      }
    }
  );

  return (
    <>
      {success && (
        <h2 className="font-semibold text-green-500 mb-5 flex items-center">
          Form has been submitted!
        </h2>
      )}
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-2"
        >
          <TextFieldWrapper {...isNameValid} />
          <TextFieldWrapper {...isEmailValid} />
          <TextFieldWrapper {...isPhoneValid} />
          {zipCodes && zipCodes?.length > 0 && <AutoComplete data={zipCodes} />}

          <Button
            onPress={onSubmit}
            className="bg-teal-600 p-3 rounded-md w-full mt-2"
          >
            Submit
          </Button>
        </form>
      </FormProvider>
    </>
  );
};
