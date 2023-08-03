"use client";

import { ActionIcon, Popover, Card, TextInput, Textarea, Button, Alert } from "@aomdev/ui";
import { AlertCircle, Check } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";

type PropTypes = {
  quizTitle: string;
  question: { id: number; question: string };
};

export function QuestionFeedback({ quizTitle, question }: PropTypes) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ message: "", error: false });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      setLoading(true);

      const title = formData.get("title") || `Feedback for ${quizTitle}`;
      let description = formData.get("description")?.toString() || "";
      description += `\n Title: ${quizTitle} \n Question: ${question.question} \n Question Id: ${question.id}`;

      const res = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, question })
      });
      if (res.ok) {
        setLoading(false);
        setAlertMessage({ message: "Thank you for your feedback!", error: false });
        setTimeout(() => {
          setAlertMessage({ message: "", error: false });
        }, 1000 * 10);
      } else {
        throw new Error("There was an error processing the request");
      }
    } catch (error) {
      if (error instanceof Error) {
        setAlertMessage({ message: error.message, error: true });
      }
    }
  };

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <Popover.Trigger asChild>
        <ActionIcon color="warn" className="flex items-center justify-center  ml-auto mb-2">
          <AlertCircle size={16} />
        </ActionIcon>
      </Popover.Trigger>
      <Popover.Content>
        <Card className="w-">
          <p className="mb-2">Submit feedback for this question.</p>
          <form className="space-y-4 mb-6" onSubmit={onSubmit}>
            <TextInput label="Title" name="title" id="feedback_title" />
            <Textarea label="Description" name="description" id="feedback_description" required />
            <Button fullWidth loading={loading}>
              Submit
            </Button>
          </form>

          {alertMessage.message && (
            <Alert
              color={alertMessage.error ? "error" : "success"}
              icon={<Check size={16} />}
              className="w-full"
            >
              {alertMessage.message}
            </Alert>
          )}
        </Card>
      </Popover.Content>
    </Popover>
  );
}
