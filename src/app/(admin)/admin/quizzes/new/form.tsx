"use client";

import { Button, Select, SelectProps, Textarea } from "@aomdev/ui";
import { QuizTitle } from "./quiz-title";
import { Radio } from "./quiz-type";
import { createQuiz } from "./actions";

type PropTypes = {
  selectItems: SelectProps["items"];
};

export function CreateQuizForm({ selectItems }: PropTypes) {
  return (
    <form
      className="space-y-6"
      action={createQuiz}
    >
      <QuizTitle />
      <Textarea
        label="Description"
        name="quiz_description"
      />
      <Select
        name="quiz_category"
        fullWidth
        items={selectItems}
      />
      <Radio />

      <Button
        type="submit"
        fullWidth
      >
        Sign in
      </Button>
    </form>
  );
}
