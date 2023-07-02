import { Avatar } from "@/components/avatar";
import Image from "next/image";
import Link from "next/link";
import asset from "@/assets/pixel.jpg";
import { Title, Badge } from "@aomdev/ui";
import { formatDate } from "@/lib/format-date";

type PropTypes = {
  title: string;
  tag: string;
};

export function Blog({ tag, title }: PropTypes) {
  return (
    <Link href={`/blog/${title.toLowerCase().trim().replaceAll(" ", "-")}`} className="space-y-4 group ">
      <figure className="relative aspect-video rounded-md overflow-hidden mb-2">
        <Image src={asset} fill alt="" />
      </figure>
      <Title order={3} className="font-heading font-medium group-hover:text-primary-500">
        {title}
      </Title>
      <p>
        Commodo sunt incididunt enim laborum exercitation est irure ad ex laboris. Esse sunt qui magna duis
        officia dolor irure est laborum.
      </p>
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-4">
          <Avatar size={48} />
          <div>
            <span className="block text-sm  font-medium">Agis Carty</span>
            <span className="block text-sm  text-neutral-600">{formatDate(new Date())}</span>
          </div>
        </div>
        <Badge color={"error"}>{tag}</Badge>
      </div>
    </Link>
  );
}
