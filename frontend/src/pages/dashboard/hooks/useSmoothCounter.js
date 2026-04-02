import { useEffect, useState } from "react";

export const useSmoothCounter = (value) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = display;
    const end = value;

    if (start === end) return;

    const increment = (end - start) / 20;

    const timer = setInterval(() => {
      start += increment;

      if (
        (increment > 0 && start >= end) ||
        (increment < 0 && start <= end)
      ) {
        start = end;
        clearInterval(timer);
      }

      setDisplay(Math.round(start));
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return display;
};