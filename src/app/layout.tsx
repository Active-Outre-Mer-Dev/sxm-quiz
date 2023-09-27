import "./globals.css";
import { Inter, Familjen_Grotesk } from "next/font/google";
import { Nav } from "@/components/navbar";
import { Footer } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const heading = Familjen_Grotesk({ subsets: ["latin"], variable: "--font-heading" });

export const metadata = {
  title: "SXM Quiz",
  description: `Test your knowledge of Saint Martin,
  Are you a local expert or a tourist?`
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`font-sans  ${inter.variable} ${heading.variable}`}>
      <body className="text-gray-700 dark:text-gray-100 dark:bg-neutral-900 pt-14">
        <ThemeProvider>
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
