"use client";
import { RadioInput } from "./RadioInput";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

type PropTypes = {
  filter: string;
};

export function LeaderboardsFilter({ filter }: PropTypes) {
  const router = useRouter();
  const onChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const url = new URL(location.pathname, location.origin);
    const filter = data.get("subject");
    if (filter) url.searchParams.set("subject", filter.toString());
    router.push(url.toString());
  };
  return (
    <form onChange={onChange} className="space-y-4" key={filter}>
      <RadioInput
        label="History"
        defaultChecked={"history" === filter}
        value={"history"}
        name="subject"
        id="history-subject"
      />
      <RadioInput
        label="Geography"
        defaultChecked={"geography" === filter}
        value={"geography"}
        name="subject"
        id="geography-subject"
      />
      <RadioInput
        label="Economy"
        defaultChecked={"economy" === filter}
        value={"economy"}
        name="subject"
        id="economy-subject"
      />
    </form>
  );
}
