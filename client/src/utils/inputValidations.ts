export const isNameValid = {
  name: "name",
  label: "name",
  type: "text",
  id: "name",
  placeholder: "Name",
  validation: {
    required: {
      value: true,
      message: "Name is required",
    },
    maxLength: {
      value: 30,
      message: "Max 30 characters",
    },
  },
};

export const isPhoneValid = {
  name: "phone",
  label: "Phone number",
  type: "tel",
  id: "phone",
  placeholder: "Your phone number",
  validation: {
    required: {
      value: true,
      message: "Phone number is required",
    },
    maxLength: {
      value: 8,
      message: "Phone number must be 8 characters",
    },
    pattern: {
      value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{3}$/,
      message: "Phone number not valid",
    },
  },
};

export const isEmailValid = {
  name: "email",
  label: "email address",
  type: "email",
  id: "email",
  placeholder: "Your email address",
  validation: {
    required: {
      value: true,
      message: "Email is required",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Email not valid",
    },
  },
};

export const isZipCodeValid = {
  name: "zip",
  label: "Zip code",
  type: "number",
  id: "zip",
  placeholder: "Zip code",
  validation: {
    required: {
      value: true,
      message: "Zip code is required",
    },
    maxLength: {
      value: 4,
      message: "No more than 4 digits",
    },
    pattern: {
      value: /^\d{4}$/,
      message: "Zip code cannot be longer than 4 numbers",
    },
  },
};
