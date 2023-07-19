type PropTypes = {
  children: React.ReactNode;
  onToggle: () => void;
};

export function QuizToggle({ onToggle, children }: PropTypes) {
  const onClick = () => onToggle();
  return (
    <button
      onClick={onClick}
      className={`group  ring-neutral-200 ring-1 text-neutral-900 h-9 
      w-9 bg-white   flex items-center justify-center
       rounded-md capitalize relative duration-200 ease-out`}
    >
      {children}
    </button>
  );
}
