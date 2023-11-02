export interface InputError {
  error: {
    message: string;
    ref: HTMLElement;
    type: string;
  };
}
export interface AutocompleteInputProps {
  data?: Array<ZipCode>;
}

export interface FormDataExtended extends FormData {
  name: string;
  email: string;
  phone: number;
  zip: string;
}

export interface FormProps {
  zipCodes: Array<ZipCode>;
  resetFormAction: Function;
}

export interface FormSchema {
  name: string;
  email: string;
  phone: number;
  zip: ZipCode;
  applicant?: string;
}
export interface ZipCode {
  code: string;
  place: string;
  city: string;
}
