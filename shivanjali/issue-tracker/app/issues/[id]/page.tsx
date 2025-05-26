"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Issue = {
  id: string;
  title: string;
  description: string;
  status: "open" | "closed";
  priority: "low" | "medium" | "high";
};

export default function IssueDetailPage() {
  const router = useRouter();
  const { id } = useParams(); // ✅ Use useParams in client components

  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/issues/${id}`)
      .then((res) => res.json())
      .then((data: Issue) => {
        setIssue(data);
        setLoading(false);
      })
      .catch(() => {
        setIssue(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!issue) return <p>Issue not found.</p>;

  const toggleStatus = async () => {
    const newStatus: Issue["status"] = issue.status === "open" ? "closed" : "open";

    setIssue({ ...issue, status: newStatus });

    await fetch(`/api/issues/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    router.refresh();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">{issue.title}</h2>
      <p className="mb-2">{issue.description}</p>
      <p className="mb-2">Priority: <strong>{issue.priority}</strong></p>
      <p className="mb-4">
        Status:{" "}
        <span className={`font-semibold ${issue.status === "open" ? "text-green-600" : "text-red-600"}`}>
          {issue.status}
        </span>
      </p>
      <button
        onClick={toggleStatus}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Toggle Status
      </button>
    </div>
  );
}
