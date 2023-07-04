"use client";
import { Select } from "@aomdev/ui";

type PropTypes = {
  value: string;
  onValueChange: (value: string) => void;
};

export function ArticleFilter({ onValueChange }: PropTypes) {
  return (
    <div className="col-span-full">
      <Select
        onValueChange={onValueChange}
        items={[
          { label: "Popular", value: "popular" },
          { label: "Recent", value: "recent" },
          { label: "Oldest", value: "oldest" }
        ]}
      />
    </div>
  );
}
