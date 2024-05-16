import "../globals.css";
import { Inter, Familjen_Grotesk } from "next/font/google";
import { Nav } from "@/components/navbar";
import { Footer } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const heading = Familjen_Grotesk({ subsets: ["latin"], variable: "--font-heading" });

export const metadata = {
  title: "SXM Quiz",
  description: `Test your knowledge of Saint Martin,
  Are you a local expert or a tourist?`
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`font-sans  ${inter.variable} ${heading.variable}`}
    >
      <body className="text-gray-700 dark:text-gray-100 dark:bg-neutral-900 pt-14">
        <ThemeProvider>
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
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
      </body>
    </html>
  );
}
