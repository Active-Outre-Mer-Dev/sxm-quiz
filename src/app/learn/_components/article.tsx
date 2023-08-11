import Image from "next/image";
import { Article } from "../page";
import Link from "next/link";
import { Badge, Title } from "@aomdev/ui";
import { getCatColor } from "@/get-category-color";
import { formatDate } from "@/lib/format-date";

type Props = { article: Article; initials: string };

export function Article({ article, initials }: Props) {
  return (
    <Link href={`/learn/${article.category}/${article.slug}`} className="overflow-hidden group">
      <figure
        className={`rounded-xl overflow-hidden h-36 mb-4 px-2 relative flex items-center 
  justify-center  `}
      >
        <Image
          src={article.thumbnail}
          fill
          alt=""
          className=" object-cover group-hover:scale-105 duration-500 ease-out"
        />
      </figure>
      <Title
        order={3}
        className={`relative group-hover:text-primary-500 group-hover:dark:text-primary-200 font-medium capitalize font-heading mb-4
    duration-200 ease-out`}
      >
        {article.title}
      </Title>
      <p className="mb-4 line-clamp-3">{article.intro}</p>
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-4">
          {article.profile ? (
            <img
              src={article.profile}
              width={50}
              height={50}
              className="rounded-full object-cover"
              alt={""}
            />
          ) : (
            <div
              style={{ width: 50, height: 50 }}
              className="rounded-full uppercase font-medium bg-neutral-100 flex items-center justify-center"
            >
              {initials}
            </div>
          )}
          <div>
            <span className="block text-sm font-medium">{article.author}</span>
            <span className="block text-sm text-gray-600 dark:text-gray-200">
              {formatDate(new Date(article.created_at))}
            </span>
          </div>
        </div>
        <Badge className="capitalize" color={getCatColor(article.category)}>
          {article.category}
        </Badge>
      </div>
    </Link>
  );
}
