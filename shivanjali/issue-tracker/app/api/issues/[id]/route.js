import { NextResponse } from "next/server";

// We need access to the same issues array in memory
// We'll move the issues array to a module so it's shared between both files
import { issues } from "../../data" // Assuming data.js exports issues

export async function GET(req, { params }) {
  const issue = issues.find((i) => i.id === params.id);
  if (!issue) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(issue);
}

export async function PUT(req, { params }) {
  const data = await req.json();
  const index = issues.findIndex((i) => i.id === params.id);

  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  issues[index] = { ...issues[index], ...data };
  return NextResponse.json(issues[index]);
}

export async function DELETE(req, { params }) {
  const index = issues.findIndex((i) => i.id === params.id);

  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  issues.splice(index, 1);
  return NextResponse.json({ message: "Deleted" });
}
