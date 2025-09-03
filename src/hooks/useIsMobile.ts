import { useState, useEffect } from "react";

export function useIsMobile(maxWidth: number = 450) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < maxWidth : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < maxWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [maxWidth]);

  return isMobile;
}
