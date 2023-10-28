import { ZipCode } from "../types";

export default function (data: ZipCode[], zip: string): ZipCode {
  const filtered = data?.filter((item) =>
    item?.code.toLowerCase().includes(zip.toString().toLowerCase())
  );

  return filtered[0];
}
