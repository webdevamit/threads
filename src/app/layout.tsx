import "./globals.css";
import { Inter } from "next/font/google";

import { ClerkProvider, auth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { ThemeProvider } from "./core/theme-provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Threads",
  description: "Threads clone built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            inter.className
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
          >
            <main className="flex justify-center items-center ">
              <div
                className={cn(
                  "min-h-screen w-full text-base max-w-[500px] relative",
                  !userId
                    ? "flex flex-col justify-center items-center pb-0"
                    : "pb-14"
                )}
              >
                {children}
              </div>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
