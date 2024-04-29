"use client";
import { TextInput } from "@aomdev/ui";
import { FormEvent, useState, useEffect } from "react";

type PropTypes = {
  name: "article" | "quiz";
  titleError?: string;
  slugError?: string;
};

export function TitleSlug({ name, slugError, titleError }: PropTypes) {
  const [slug, setSlug] = useState<string>();
  const [slugValue, setSlugValue] = useState<string>();

  useEffect(() => {
    setSlugValue(slug);
  }, [slug]);

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSlug(value.replace(/\s+/g, "-")?.toLowerCase());
  };
  const onValueChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSlugValue(value.replace(/\s+/g, "-").toLowerCase());
  };

  return (
    <>
      <TextInput
        name={`${name}_title`}
        label="Title"
        // required
        onChange={onChange}
        error={titleError}
      />
      <TextInput
        pattern="/^[a-z0-9-]+$/"
        label="Slug"
        name={`${name}_slug`}
        defaultValue={slug}
        value={slugValue}
        onChange={onValueChange}
        // required
        error={slugError}
      />
    </>
  );
}
