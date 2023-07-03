"use client";
import { ContainerProvider } from "./container.context";
import { Card } from "@aomdev/ui";
import { QuizTabs } from "../quiz-tabs";

type PropTypes = {
  children: React.ReactNode;
  type: "multiple_choice" | "list";
  title: string;
  description: string;
  questionCount: number;
  category: string;
  count: number;
  update: () => Promise<void>;
  average: number;
  id: number;
};

export function Container({ children, ...props }: PropTypes) {
  return (
    <ContainerProvider {...props}>
      <Card className="hidden lg:block basis-2/5">
        <QuizTabs count={props.count} />
      </Card>
      <Card className="basis-full lg:basis-3/5 ">{children}</Card>
    </ContainerProvider>
  );
}
