import { useEffect, useState } from "react";
import surprise from "./surprise.png";

export function Surprise({
  isAnimating,
  setIsAnimating,
}: {
  isAnimating: boolean;
  setIsAnimating: Function;
}) {
  const [showImage1, setShowImage1] = useState<boolean>(true);

  useEffect(() => {
    let interval: any;
    if (isAnimating) {
      interval = setInterval(() => {
        setShowImage1((prevState) => !prevState);
      }, 300);

      setTimeout(() => {
        clearInterval(interval);
        setIsAnimating(false);
      }, 10000);
    }
  }, [isAnimating]);

  return (
    <div className={`walking-container ${isAnimating ? "animate" : ""}`}>
      <div className="walking">
        {showImage1 ? (
          <img src={surprise} alt="Surprise form action" />
        ) : (
          <img className="flipped" src={surprise} alt="Surprise form action" />
        )}
      </div>
    </div>
  );
}
