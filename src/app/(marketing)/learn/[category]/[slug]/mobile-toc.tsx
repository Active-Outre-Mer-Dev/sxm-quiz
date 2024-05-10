type PropTypes = {
  headings: { title: string; id: string }[];
  slug: string;
  category: string;
};

export function MobileTOC({ headings, category, slug }: PropTypes) {
  return (
    <div className="lg:hidden mb-10">
      <p className="font-heading text-xl mb-4 font-medium">On this page</p>
      <ul className="space-y-2">
        {headings.map((heading) => {
          return (
            <li key={heading.id}>
              <a
                href={`/learn/${category}/${slug}#${heading.id}`}
                className="dark:text-primary-200 text-primary-500 underline underline-offset-2"
              >
                {heading.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
