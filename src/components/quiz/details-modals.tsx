"use client";
import { Button } from "@aomdev/ui";
import { useState, Suspense, lazy } from "react";
import type { BadgeProps } from "@aomdev/ui";

const Details = lazy(() => import("./details"));

export type PropTypes = {
  title: string;
  badgeColor: BadgeProps["color"];
  type: string;
  slug: string;
};

export function DetailsWrapper(props: PropTypes) {
  const [load, setLoad] = useState(false);
  return (
    <>
      {!load && (
        <Button variant={"neutral"} size={"sm"} onMouseEnter={() => setLoad(true)}>
          View details
        </Button>
      )}
      <Suspense
        fallback={
          <Button size={"sm"} variant={"neutral"}>
            View details
          </Button>
        }
      >
        {load && <Details {...props} />}
      </Suspense>
    </>
  );
}
