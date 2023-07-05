"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const headings = [
  { id: "how-it-started", label: "How it started" },
  { id: "features", label: "Features" },
  { id: "whats-next", label: "Whats next" }
];

function createObserver(cb: (id: string) => void) {
  return new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cb(entry.target.id);
        }
      });
    },
    { rootMargin: "0% 0% -70% 0%" }
  );
}

export function TableOfContents() {
  const [activeId, setActiveId] = useState("");
  useEffect(() => {
    const observer = createObserver(setActiveId);

    headings.forEach(heading => {
      const element = document.getElementById(`${heading.id}`);
      if (element) {
        observer.observe(element);
      }
    });
    return () => {
      const intro = document.getElementById("intro");
      if (intro) observer.unobserve(intro);
      headings.forEach(heading => {
        const element = document.getElementById(`${heading.id}`);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);
  return (
    <div className="basis-1/6 grow  px-4 hidden lg:block">
      <div className="sticky top-20">
        <p className="font-medium text-lg mb-5">On this page</p>
        <ul className="space-y-2 mb-5">
          {headings.map(heading => {
            return (
              <Item key={`${heading.id}`} active={activeId === `${heading.id}`} id={`${heading.id}`}>
                {heading.label}
              </Item>
            );
          })}
        </ul>
        <div />
        <Link href={"/learn"} className="text-primary-600">
          ← Go back
        </Link>
      </div>
    </div>
  );
}

type PropTypes = {
  active: boolean;
  id: string;
  children: React.ReactNode;
};

function Item({ active, children, id }: PropTypes) {
  return (
    <li
      data-active={active}
      className={`data-[active=true]:text-primary-500  text-neutral-700
        data-[active=true]:underline `}
    >
      <a href={`/blog/introducing-sxm-quiz#${id}`}>{children}</a>
    </li>
  );
}
