"use client";
import * as RadixAccordian from "@radix-ui/react-accordion";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { RadioInput } from "./RadioInput";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

type PropTypes = {
  subject: string;
  difficulty: string;
};

export function Accordian({ difficulty, subject }: PropTypes) {
  const router = useRouter();
  const onChange = (e: FormEvent<HTMLFormElement>) => {
    const url = new URL(`${location.pathname}${location.search}`, location.origin);
    const formData = new FormData(e.currentTarget);
    const subject = formData.get("subject-filter");
    const difficulty = formData.get("difficulty-filter");
    if (subject) url.searchParams.set("subject", subject.toString());
    if (difficulty) url.searchParams.set("difficulty", difficulty.toString());
    router.push(url.toString());
  };
  return (
    <RadixAccordian.Root type="multiple" className="w-full">
      <RadixAccordian.Item value="subjects">
        <Trigger>Subjects</Trigger>
        <Content>
          <form onChange={onChange} className="space-y-4">
            <RadioInput
              label="History"
              checked={subject === "history"}
              name="subject-filter"
              id="history-filter"
              value={"history"}
            />
            <RadioInput
              label="Geography"
              checked={subject === "geography"}
              name="subject-filter"
              id="geography-filter"
              value={"geography"}
            />
            <RadioInput
              label="Economy"
              checked={subject === "economy"}
              name="subject-filter"
              id="economy-filter"
              value={"economy"}
            />
          </form>
        </Content>
      </RadixAccordian.Item>
      <RadixAccordian.Item value="difficulty">
        <Trigger>Difficulty</Trigger>
        <Content>
          <form onChange={onChange} className="space-y-4">
            <RadioInput
              label="Tourist"
              checked={difficulty === "easy"}
              name="difficulty-filter"
              id="easy-filter"
              value={"easy"}
            />
            <RadioInput
              label="Medium"
              checked={difficulty === "medium"}
              name="difficulty-filter"
              id="medium-filter"
              value={"medium"}
            />
            <RadioInput
              label="Local expert"
              checked={difficulty === "hard"}
              name="difficulty-filter"
              id="hard-filter"
              value={"hard"}
            />
          </form>
        </Content>
      </RadixAccordian.Item>
    </RadixAccordian.Root>
  );
}

function Trigger(props: RadixAccordian.AccordionTriggerProps) {
  return (
    <RadixAccordian.AccordionHeader className="border-b flex justify-start text-start  text-on-surface border-outline-variant py-2 pb-2">
      <RadixAccordian.Trigger {...props} className="group text-start h-full  w-full">
        <ChevronRightIcon className="inline-block mr-2 group-data-[state='open']:rotate-90" />
        {props.children}
      </RadixAccordian.Trigger>
    </RadixAccordian.AccordionHeader>
  );
}

function Content(props: RadixAccordian.AccordionContentProps) {
  return (
    <RadixAccordian.Content {...props} className="px-6 bg-surface py-2 border-b border-outline-variant">
      {props.children}
    </RadixAccordian.Content>
  );
}
