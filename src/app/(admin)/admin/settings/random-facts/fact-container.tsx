"use client";
import { RandomFact } from "@/types/custom.types";
import { Fact, Facts } from "./fact";
import { FactForm } from "./fact-form";
import { useOptimistic } from "react";

type PropTypes = {
  facts: RandomFact[];
  children: React.ReactNode;
};

export function FactContainer({ facts, children }: PropTypes) {
  const [optimisticFacts, setOptimistic] = useOptimistic(facts);

  const addOptimisticFact = (fact: RandomFact) => {
    setOptimistic((state) => [fact, ...state]);
  };

  const removeOptimisticFact = (id: string) => {
    setOptimistic((state) => state.filter((f) => f.id !== id));
  };

  return (
    <>
      <FactForm addOptimisticFact={addOptimisticFact} />
      {children}
      <Facts>
        {optimisticFacts.map((fact, index) => {
          if (index === 0) {
            console.log(`random-fact-${fact.description}`);
          }
          return (
            <Fact
              removeOptimisticFact={removeOptimisticFact.bind(null, fact.id)}
              {...fact}
              key={`random-fact-${fact.description}`}
            />
          );
        })}
      </Facts>
    </>
  );
}
