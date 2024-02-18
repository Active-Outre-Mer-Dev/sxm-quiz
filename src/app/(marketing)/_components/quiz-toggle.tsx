import { ActionIcon } from "@aomdev/ui";

type PropTypes = {
  children: React.ReactNode;
  onToggle: () => void;
  label: string;
};

export function QuizToggle({ onToggle, children, label }: PropTypes) {
  const onClick = () => onToggle();
  return (
    <ActionIcon aria-label={label} onClick={onClick} size={"xl"} variant={"light"}>
      {children}
    </ActionIcon>
  );
}
