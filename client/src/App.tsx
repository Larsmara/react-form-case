import { useState, useEffect } from "react";
import { setDocumentTheme } from "./utils/theme";
import { Form } from "./components/Form";
import { ZipCode } from "./types";
import { fetchFromApi } from "./api";
import zoidberg from "./utils/zoidberg.png";

function App() {
  const [codes, setCodes] = useState<Array<ZipCode>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showImage1, setShowImage1] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  setDocumentTheme();

  useEffect(() => {
    let interval: any;
    if (isAnimating) {
      interval = setInterval(() => {
        setShowImage1((prevState) => !prevState);
      }, 300);
    }

    return () =>
      setTimeout(() => {
        clearInterval(interval);
        setIsAnimating(false);
      }, 10000);
  }, [isAnimating]);

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
      <div className="hero-content flex-col lg:flex-row-reverse mx-20">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-sm bg-base-100">
          {loading ? (
            "Loading.."
          ) : (
            <Form zipCodes={codes} resetFormAction={resetform} />
          )}
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">
            Register now for our newsletter!
          </h1>
          <p className="mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia cumque
            hic quod blanditiis aspernatur perferendis ipsa ex possimus
            assumenda maxime.
          </p>
        </div>
      </div>
      <div className={`walking-container ${isAnimating ? "animate" : ""}`}>
        <div className="walking-zoidberg">
          {showImage1 ? (
            <img className="zoidberg" src={zoidberg} alt="Zoidberg" />
          ) : (
            <img className="zoidberg flipped" src={zoidberg} alt="Zoidberg" />
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
