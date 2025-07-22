import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";

const IBMplex = Inter({
  variable: "--ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "NextBlog",
  description: "Next Tech bloging app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${IBMplex.className} antialiased`}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class">
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </ThemeProvider>
          <Toaster position="top-center" richColors visibleToasts={1} />
        </SessionProvider>
      </body>
    </html>
  );
}
