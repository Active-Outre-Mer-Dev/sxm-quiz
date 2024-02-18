import Image from "next/image";
import Link from "next/link";
import { Badge, Title } from "@aomdev/ui";
import { getCatColor } from "@/get-category-color";
import { formatDate } from "@/lib/format-date";
import { Author } from "@/components/author";
import type { ArticleProps } from "@/types/custom.types";

export function Article(props: ArticleProps) {
  return (
    <Link href={`/learn/${props.category}/${props.slug}`} className="overflow-hidden group lg:basis-1/3 grow">
      <figure
        className={`rounded-xl overflow-hidden  mb-4 px-2 relative flex items-center aspect-video w-full
  justify-center  `}
      >
        <Image
          src={props.thumbnail}
          fill
          alt=""
          className=" object-cover group-hover:scale-105 duration-500 ease-out h-full"
        />
      </figure>
      <div className="flex gap-6 items-center mt-2">
        <time className=" text-gray-600 dark:text-gray-300">{formatDate(new Date(props.created_at))}</time>
        <Badge color={getCatColor(props.category)}>{props.category}</Badge>
      </div>
      <Title
        order={3}
        className={`relative group-hover:text-primary-500 group-hover:dark:text-primary-200 font-medium capitalize font-heading mb-4
    duration-200 ease-out`}
      >
        {props.title}
      </Title>
      <p className="mb-4 line-clamp-3">{props.intro}</p>
      <Author name={`${props.author}`} img={props.profile} />
    </Link>
  );
}
