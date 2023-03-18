"use client";
import * as RadixAccordian from "@radix-ui/react-accordion";
import { ChevronRightIcon } from "@radix-ui/react-icons";

export function Accordian({}) {
  return (
    <RadixAccordian.Root type="multiple" className="w-full">
      <RadixAccordian.Item value="subjects">
        <Trigger>Subjects</Trigger>
        <Content>
          <ul>
            <li>History</li>
            <li>Geography</li>
            <li>Economy</li>
          </ul>
        </Content>
      </RadixAccordian.Item>
      <RadixAccordian.Item value="difficulty">
        <Trigger>Difficulty</Trigger>
        <Content>
          <ul>
            <li>Tourist</li>
            <li>Medium</li>
            <li>Local expert</li>
          </ul>
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
