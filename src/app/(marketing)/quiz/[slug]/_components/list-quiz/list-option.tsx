type PropTypes = {
  active: boolean;
  option: string;
};

export function QuizOption({ active, option }: PropTypes) {
  return (
    <p
      className={`rounded-sm  flex items-center justify-center p-2 ${
        active ? "bg-success-700 text-white" : "bg-neutral-200/30 "
      }`}
    >
      {option}
    </p>
  );
}
