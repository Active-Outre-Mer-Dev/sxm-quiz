import "../globals.css";
import { Metadata } from "next";
import { Inter, Familjen_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AdminNav } from "@/components/admin/admin-nav";
import { getUser } from "@/lib/get-user";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const heading = Familjen_Grotesk({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: { default: "Admin | SXM Quiz", template: "%s | SXM Quiz" }
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  // const { error } = await getUser("server_component", true);
  // if (error) notFound();
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`dark dark-mode ${inter.variable} ${heading.variable}`}
    >
      <body className="dark:bg-neutral-900  text-gray-700 dark:text-gray-100 duration-200 ease-out">
        <ThemeProvider>
          <AdminNav />
          <main className="ml-auto w-5/6">{children}</main>
          <Toaster
            toastOptions={{
              unstyled: true,
              classNames: {
                toast:
                  "bg-neutral-900 p-4 w-[356px] flex gap-[6px] items-center ring-1 ring-neutral-800 rounded",
                success: "text-success-500",
                title: "text-gray-100",
                description: "text-gray-200",
                error: "text-error-500"
              }
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
