type PropTypes = {
  children: React.ReactNode;
};

export function GradientLetter({ children }: PropTypes) {
  return (
    <span className="bg-gradient-to-b from-gray-600 to-gray-900 bg-clip-text text-transparent">
      {children}
    </span>
  );
}
