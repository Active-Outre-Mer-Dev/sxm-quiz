"use client";
import { Radio as _Radio } from "@aomdev/ui";

export function Radio() {
  return (
    <fieldset>
      <legend className="text-sm select-none font-medium text-gray-800 dark:text-gray-100 block mb-1">
        Quiz type
      </legend>
      <_Radio name="quiz_type">
        <_Radio.Item label="Multiple choice" value="multiple_choice" />
        <_Radio.Item label="List Quiz" value="list" />
      </_Radio>
    </fieldset>
  );
}
