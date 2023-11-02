import { FormSchema, ZipCode } from "../types";

const baseUrl = "http://localhost:3001";

export const fetchFromApi = async (path: string): Promise<ZipCode[]> => {
  const result = await fetch(`${baseUrl}/${path}`).then((res) => res.json());
  return result;
};

export const postForm = async (data: FormSchema): Promise<any> => {
  try {
    const result = await fetch(`${baseUrl}/api`, {
      method: "POST",
      headers: {
        accept: "application.json",
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return result.status;
  } catch (error) {
    console.error(error);
    return 400;
  }
};

export const postToCase = async (data: FormSchema): Promise<any> => {
  /* try {
    const res = await fetch("https://case.nettbureau.no/submit", {
      method: "POST",
      headers: {
        accept: "application.json",
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  } */
};
