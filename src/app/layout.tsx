import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/Home/SideBar";
import Navbar from "@/components/Home/Navbar";
import MainContent from "@/components/Home/MainContent";
import { Metadata } from "next";
import {
  SidebarProvider,
} from "@/components/ui/sidebar";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plusJakartaSans",
});

export const metadata: Metadata = {
  title: "OneBoard",
  description: "OneBoard Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased bg-[#0f1535] text-white`}
      >
        <SidebarProvider>
          <SideBar />
          <MainContent>
            <Navbar />
            <section className="flex-1 p-4 md:p-6">{children}</section>
          </MainContent>
        </SidebarProvider>
      </body>
    </html>
  );
}

