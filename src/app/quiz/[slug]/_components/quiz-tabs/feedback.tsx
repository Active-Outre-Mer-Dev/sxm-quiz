import { Textarea, Button, Alert } from "@aomdev/ui";
import type { FormEvent } from "react";
import { useQuiz } from "../container/container.context";
import { useState } from "react";
import { Check } from "lucide-react";

export function Feedback() {
  const { title } = useQuiz();
  const [show, setShow] = useState(false);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.append("title", title);
    const res = await fetch("/api/email", {
      method: "POST",
      body: form
    });
    if (res.ok) {
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 1000 * 5);
    }
  };
  return (
    <>
      <form className="space-y-4 mb-4" onSubmit={onSubmit}>
        <Textarea label="Write message" name="message" id="message" />
        <Button variant={"neutral"}>Submit</Button>
      </form>
      {show && (
        <Alert icon={<Check size={16} />} color={"success"}>
          Thank you for your feedback!
        </Alert>
      )}
    </>
  );
}
