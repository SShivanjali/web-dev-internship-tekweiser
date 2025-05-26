"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type Issue = {
  id: number;
  title: string;
  status: "open" | "closed";
  priority: "low" | "medium" | "high";
};

export default function IssuesPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filter, setFilter] = useState<"all" | "low" | "medium" | "high">("all");

  useEffect(() => {
    fetch("/api/issues")
      .then((res) => res.json())
      .then((data: Issue[]) => setIssues(data));
  }, []);

  const filteredIssues =
    filter === "all"
      ? issues
      : issues.filter((issue) => issue.priority === filter);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Issues</h2>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Priority:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Issue["priority"] | "all")}
          className="border rounded p-1 "
        >
          <option value="all" className="text-black bg-white">All</option>
          <option value="low" className="text-black bg-white">Low</option>
          <option value="medium" className="text-black bg-white">Medium</option>
          <option value="high" className="text-black bg-white">High</option>
        </select>
      </div>

      {filteredIssues.length === 0 ? (
        <p>No issues found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredIssues.map(({ id, title, status, priority }) => (
            <li
              key={id}
              className="border p-4 rounded bg-white shadow hover:shadow-lg transition text-gray-900"
            >
              <Link href={`/issues/${id}`}>
                <h3 className="text-xl font-semibold hover:underline hover:text-blue-600">
                  {title}
                </h3>
              </Link>
              <p>
                Status:{" "}
                <span
                  className={`font-bold ${
                    status === "open" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {status}
                </span>
              </p>
              <p>Priority: {priority}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
