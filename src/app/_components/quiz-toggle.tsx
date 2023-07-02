type PropTypes = {
    type: "list" | "quiz";
    onToggle: (type: "list" | "quiz") => void;
    active: boolean;
}

export function QuizToggle({
    type,
    active,
    onToggle
  }: PropTypes) {
    const onClick = () => onToggle(type);
    return (
      <button
        data-active={active}
        onClick={onClick}
        className={`group  ring-primary-600 ring-1 text-neutral-900 px-4 
      py-1 bg-white data-[active=true]:bg-primary-600  data-[active=true]:text-white 
      data-[active=false]:ring-neutral-200 rounded-md capitalize relative duration-200 ease-out`}
      >
        {type}
      </button>
    );
  }