import { Button, ButtonProps } from "@aomdev/ui";
import { useFormStatus } from "react-dom";

export function FormButton(props: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      disabled={pending || props.disabled}
    />
  );
}
