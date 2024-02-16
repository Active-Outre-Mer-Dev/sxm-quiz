"use client";
import { TextInput } from "@aomdev/ui";
import { FormEvent, useState, useEffect } from "react";

export function QuizTitle() {
  const [slug, setSlug] = useState("");
  const [slugValue, setSlugValue] = useState("");

  useEffect(() => {
    setSlugValue(slug);
  }, [slug]);

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSlug(value.replace(/\s+/g, "-").toLowerCase());
  };
  const onValueChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSlugValue(value.replace(/\s+/g, "-").toLowerCase());
  };

  return (
    <>
      <TextInput name="quiz_title" label="Title" required onChange={onChange} />
      <TextInput
        pattern="/^[a-z0-9-]+$/"
        label="Slug"
        name="quiz_slug"
        defaultValue={slug}
        value={slugValue}
        onChange={onValueChange}
        required
      />
    </>
  );
}
