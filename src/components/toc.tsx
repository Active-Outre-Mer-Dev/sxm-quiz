"use client";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";

type TOCProps = {
  headings: { title: string; id: string }[];
  githubEdit?: boolean;
};

function createObserver(cb: (id: string) => void) {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          cb(entry.target.id);
        }
      });
    },
    { rootMargin: "0% 0% -70% 0%" }
  );
}

export function TableOfContents({ headings, githubEdit }: TOCProps) {
  const [activeId, setActiveId] = useState("");
  const path = usePathname();
  const params = useParams();

  useEffect(() => {
    const observer = createObserver(setActiveId);

    const intro = document.getElementById("intro");
    if (intro) observer.observe(intro);
    headings.forEach((heading) => {
      const element = document.getElementById(`${heading.id}`);
      if (element) {
        observer.observe(element);
      }
    });
    return () => {
      const intro = document.getElementById("intro");
      if (intro) observer.unobserve(intro);
      headings.forEach((heading) => {
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
          <Item
            path={path}
            active={activeId === "intro"}
            id={"intro"}
          >
            Intro
          </Item>
          {headings.map((heading) => {
            return (
              <Item
                path={path}
                key={`${heading.title}`}
                active={activeId === heading.id}
                id={`${heading.id}`}
              >
                {heading.title}
              </Item>
            );
          })}
        </ul>
        <div />
        <div className="space-y-4 border-t border-t-neutral-100 dark:border-t-neutral-700 pt-4">
          {githubEdit ? (
            <a
              target="_blank"
              className="block hover:dark:text-primary-200 hover:text-primary-500"
              href={`https://github.com/Active-Outre-Mer-Dev/sxm-quiz/issues/new`}
            >
              See an issue? Give us feedback{" "}
              <ExternalLink
                size={16}
                className="inline-block mr-2"
              />
            </a>
          ) : null}
        </div>
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
