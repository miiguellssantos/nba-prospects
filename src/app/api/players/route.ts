import { NextResponse } from "next/server";

import data from "./players.json";

export async function GET() {
  return NextResponse.json({ data });
}