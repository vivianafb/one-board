import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investments | OneBoard",
};

export default function InvestmentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
