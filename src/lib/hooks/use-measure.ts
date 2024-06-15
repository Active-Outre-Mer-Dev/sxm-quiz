import { useEffect, useRef, useState } from "react";

export function useMeasure() {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.target.getBoundingClientRect().height);
    });
    observer.observe(ref.current);
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, height] as const;
}
