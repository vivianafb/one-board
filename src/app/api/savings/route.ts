import { NextResponse } from "next/server";
import savings from "@/mocks/savings";

export async function GET() {
  return NextResponse.json(savings);
}
