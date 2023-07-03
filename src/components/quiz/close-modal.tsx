"use client";

type PropTypes = {
  onClose: () => void;
  children: React.ReactNode;
};

export function CloseModal({ children, onClose }: PropTypes) {
  return (
    <button onClick={onClose} className=" w-5 h-5 rounded-full flex items-center justify-center">
      {children}
    </button>
  );
}
