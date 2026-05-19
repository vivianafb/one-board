import { NextResponse } from "next/server";
import investments from "@/mocks/investments";

export async function GET() {
  return NextResponse.json(investments);
}
