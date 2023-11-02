import { TextFieldWrapper } from "./TextFieldWrapper";
import { FormProvider, useForm } from "react-hook-form";
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

export const Form = ({ zipCodes, resetFormAction }: FormProps) => {
  const methods = useForm<FormDataExtended>({
    mode: "onChange",
  });
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: any) => {
    const zip = getZipCodeLocation(zipCodes, data.zip);
    const mappedData: FormSchema = {
      ...data,
      zip,
      applicant: "Lars-Martin Antonsen",
    };

    try {
      const res = await postForm(mappedData);
      if (res === 200) {
        await postToCase(mappedData);
        methods.reset();
        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
      setSuccess(false);
    }
  };

  if (success) {
    return (
      <div className="card flex-shrink-0 w-full max-w-sm shadow-sm bg-base-100">
        <div className="card-body">
          <h2 className="font-semibold text-teal-500 mb-5 text-center">
            Thank you for registering!
          </h2>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card-body">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 form"
          >
            <TextFieldWrapper {...isNameValid} />
            <TextFieldWrapper {...isEmailValid} />
            <TextFieldWrapper {...isPhoneValid} />
            {zipCodes && zipCodes?.length > 0 && (
              <AutoComplete data={zipCodes} />
            )}

            <button type="submit" className="btn btn-accent mt-2">
              Register
            </button>
          </form>
        </FormProvider>
        <button className="btn" onClick={() => resetFormAction()}>
          REset
        </button>
      </div>
    );
  }
};
