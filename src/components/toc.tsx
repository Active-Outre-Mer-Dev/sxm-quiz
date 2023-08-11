"use client";
import type { Heading } from "@/lib/get-content";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type TOCProps = {
  headings: Heading[];
};

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

export function TableOfContents({ headings }: TOCProps) {
  const [activeId, setActiveId] = useState("");
  const path = usePathname();

  useEffect(() => {
    const observer = createObserver(setActiveId);

    const intro = document.getElementById("intro");
    if (intro) observer.observe(intro);
    headings.forEach(heading => {
      const element = document.getElementById(`${heading.data.hProperties.id}`);
      if (element) {
        observer.observe(element);
      }
    });
    return () => {
      const intro = document.getElementById("intro");
      if (intro) observer.unobserve(intro);
      headings.forEach(heading => {
        const element = document.getElementById(`${heading.data.hProperties.id}`);
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
          <Item path={path} active={activeId === "intro"} id={"intro"}>
            Intro
          </Item>
          {headings.map(heading => {
            return (
              <Item
                path={path}
                key={`${heading.data.hProperties.id}`}
                active={activeId === `${heading.data.hProperties.id}`}
                id={`${heading.data.hProperties.id}`}
              >
                {heading.value}
              </Item>
            );
          })}
        </ul>
        <div />
        <Link href={"/learn"} className="text-primary-600 dark:text-primary-200">
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
  path: string;
};

function Item({ active, children, id, path }: PropTypes) {
  return (
    <li
      data-active={active}
      className={`data-[active=true]:text-primary-500 data-[active=true]:dark:text-primary-200  
        data-[active=true]:underline `}
    >
      <a href={`${path}#${id}`}>{children}</a>
    </li>
  );
}
