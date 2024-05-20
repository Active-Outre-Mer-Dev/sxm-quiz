"use client";
import { TextInput, Radio as _Radio } from "@aomdev/ui";
import { useState } from "react";

export function Radio() {
  const [showTask, setShowTask] = useState("");
  return (
    <>
      <fieldset>
        <legend className="text-sm select-none font-medium text-gray-800 dark:text-gray-100 block mb-1">
          Quiz type
        </legend>
        <_Radio
          onValueChange={setShowTask}
          name="quiz_type"
        >
          <_Radio.Item
            label="Multiple choice"
            value="multiple_choice"
          />
          <_Radio.Item
            label="List Quiz"
            value="list"
          />
        </_Radio>
      </fieldset>
      {showTask === "list" && (
        <TextInput
          name="quiz_task"
          label="Task"
        />
      )}
    </>
  );
}
