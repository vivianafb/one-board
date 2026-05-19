import { NextResponse } from "next/server";
import transactions from "@/mocks/transactions";

export async function GET() {
  return NextResponse.json(transactions);
}
