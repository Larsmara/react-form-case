import { useState, useEffect } from "react";
import { setDocumentTheme } from "./utils/theme";
import { Form } from "./components/Form";
import { ZipCode } from "./types";
import { fetchFromApi } from "./api";
import { Surprise } from "./components/Surprise";

function App() {
  const [codes, setCodes] = useState<Array<ZipCode>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

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
      setCodes(mapped);
      setLoading(false);
    });

    res.catch((error) => console.error(error));
  }, []);

  const resetform = () => {
    if (!isAnimating) {
      setIsAnimating(true);
    }
  };

  return (
    <main className="hero min-h-screen bg-base-200 relative">
      <div className="hero-content flex-col lg:flex-row lg:gap-16 gap-4">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">
            Register now for our newsletter!
          </h1>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia cumque
            hic quod blanditiis aspernatur perferendis ipsa ex possimus
            assumenda maxime.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-sm bg-base-100">
          {loading ? (
            "Loading.."
          ) : (
            <Form zipCodes={codes} resetFormAction={resetform} />
          )}
        </div>
      </div>
      <Surprise isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
    </main>
  );
}

export default App;
