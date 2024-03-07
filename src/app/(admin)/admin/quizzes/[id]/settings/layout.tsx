import Link from "next/link";
export default function QuizSettingsLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return <>{children}</>;
}
