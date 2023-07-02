import { useEffect } from "react";

type PropTypes = {
  children: React.ReactNode;
  onConfetti: () => void;
};

export function ShowConfetti({ children, onConfetti }: PropTypes) {
  useEffect(() => {
    onConfetti();
  }, []);

  return (
    <div style={{ minHeight: 250 }} className="flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
