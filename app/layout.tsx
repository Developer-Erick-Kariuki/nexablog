import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

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
        <ThemeProvider attribute="class">
          <SessionProvider session={session}>{children}</SessionProvider>
        </ThemeProvider>
        <Toaster position="top-center" richColors visibleToasts={1} />
      </body>
    </html>
  );
}
