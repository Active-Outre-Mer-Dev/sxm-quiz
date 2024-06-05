import { getCatColor } from "@/get-category-color";
import { getArticle } from "@/lib/get-articles";
import { Badge, Title } from "@aomdev/ui";

type PropTypes = {
  slug: string;
};

export async function Sidebar({ slug }: PropTypes) {
  const { data, error } = await getArticle(slug);
  if (error) throw new Error("Bruh");
  const properties = [
    {
      title: "Author",
      element: (
        <>
          <span className="font-medium hover:underline flex items-center  text-gray-800 dark:text-gray-50">
            {data.profiles?.first_name} {data.profiles?.last_name}
          </span>
        </>
      )
    },
    {
      title: "Status",
      element: (
        <>
          <Badge
            color={data.status === "published" ? "success" : "warn"}
            className="capitalize"
          >
            {data.status}
          </Badge>
        </>
      )
    },
    {
      title: "Category",
      element: (
        <>
          <Badge
            color={getCatColor(data.category)}
            className="capitalize"
          >
            {data.category}
          </Badge>
        </>
      )
    }
  ];
  return (
    <div className=" basis-1/5 ">
      <div className=" p-4 sticky top-0 left-0 h-screen">
        <Title
          order={1}
          className="font-semibold font-heading text-2xl mb-8 text-gray-900 dark:text-gray-50"
        >
          {data.title}
        </Title>
        <ul className="space-y-6">
          {properties.map((prop) => {
            return (
              <li
                key={prop.title}
                className="flex gap-4 items-center text-gray-600 dark:text-gray-200"
              >
                {prop.title}
                {prop.element}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
