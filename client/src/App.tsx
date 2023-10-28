import { useState, useEffect } from "react";
import { setDocumentTheme } from "./utils/theme";
import { Form } from "./components/Form";
import { ZipCode } from "./types";
import { fetchFromApi } from "./api";

function App() {
  const [codes, setZipCodes] = useState<Array<ZipCode>>();
  const [loading, setLoading] = useState<boolean>(false);
  setDocumentTheme();

  useEffect(() => {
    setLoading(true);
    const res = fetchFromApi("zip").then((data: Array<ZipCode>) => {
      const mapped: Array<ZipCode> = data.filter((item: ZipCode) => {
        if (
          item.code === undefined ||
          item.place === undefined ||
          item.city === undefined
        ) {
          return;
        }
        return item;
      });
      setZipCodes(mapped);
      setLoading(false);
    });

    res.catch((error) => console.error(error));
  }, []);

  return (
    <main className="grid h-screen place-content-center items-center">
      <div className="w-80">
        {loading ? "Loading.." : <Form zipCodes={codes} />}
      </div>
    </main>
  );
}

export default App;
