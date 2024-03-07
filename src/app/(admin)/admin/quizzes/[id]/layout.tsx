import { Nav } from "@/app/(admin)/_components/nav";

export default function QuizLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  console.log(params);
  return (
    <>
      {" "}
      <Nav
        route="quizzes"
        id={params.id}
      />
      {children}
    </>
  );
}
