import { NextResponse } from "next/server";
import { issues, generateId } from "../data";

export async function GET() {
  return NextResponse.json(issues);
}

export async function POST(req) {
  const data = await req.json();

  const newIssue = {
    id: generateId(),
    ...data,
  };

  issues.push(newIssue);
  return NextResponse.json(newIssue);
}
