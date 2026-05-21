import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import SideBar from "@/components/Home/SideBar";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import MSWProvider from "@/components/MSWProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plusJakartaSans",
});

export const metadata: Metadata = {
  title: "OneBoard | Personal Finance Dashboard",
  description:
    "Personal finance dashboard built with Next.js, TypeScript, Zustand and Recharts. Demonstrates frontend architecture, state management and data visualization.",
  keywords: [
    "Next.js",
    "TypeScript",
    "Zustand",
    "Recharts",
    "dashboard",
    "personal finance",
    "frontend architecture",
  ],
  authors: [{ name: "Viviana Fajardo" }],
  openGraph: {
    title: "OneBoard | Personal Finance Dashboard",
    description:
      "Frontend architecture demo — Next.js + TypeScript + Zustand",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        <MSWProvider>
          <div className="flex min-h-screen w-full">
            <SideBar />
            <main className="flex-1 flex flex-col min-w-0 bg-background text-foreground">
              <Navbar />
              <section className="ob-page flex-1">{children}</section>
              <Footer />
            </main>
          </div>
        </MSWProvider>
      </body>
    </html>
  );
}
