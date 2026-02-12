import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import SideBar from "@/components/Home/SideBar";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plusJakartaSans",
});

export const metadata: Metadata = {
  title: 'OneBoard | Dashboard Financiero',
  description: 'Gestión inteligente de gastos e inversiones personales.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        <div className="flex min-h-screen w-full">
          <SideBar />
          <main className="flex-1 flex flex-col min-w-0 bg-background text-foreground">
            <Navbar />
            <section className="ob-page flex-1">{children}</section>
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
