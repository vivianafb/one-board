import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Savings | OneBoard",
};

export default function SavingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
