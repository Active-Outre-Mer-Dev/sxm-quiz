import type { Heading } from "@/lib/get-content";

type PropTypes = {
  headings: Heading[];
  slug: string;
  category: string;
};

export function MobileTOC({ headings, category, slug }: PropTypes) {
  return (
    <div className="lg:hidden mb-10">
      <p className="font-heading text-xl mb-4 font-medium">On this page</p>
      <ul className="space-y-2">
        {headings.map(heading => {
          return (
            <li key={heading.value}>
              <a
                href={`/learn/${category}/${slug}`}
                className="dark:text-primary-200 text-primary-500 underline underline-offset-2"
              >
                {heading.value}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
