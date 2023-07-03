import Link from "next/link";
import { Title } from "@aomdev/ui";

export default function NotFound() {
  return (
    <>
      <span
        className={`block leading-none text-center text-2xl mt-10 font-medium font-heading mb-5 
      bg-gradient-to-r from-primary-600 to-primary-200 bg-clip-text text-transparent`}
      >
        404
      </span>
      <Title order={1} className="font-heading font-medium text-center">
        AHHHHHHHHHHH
      </Title>
      <Link href={"/learn"} className="text-primary-500 text-2xl mt-5 block text-center">
        Go back
      </Link>
    </>
  );
}
