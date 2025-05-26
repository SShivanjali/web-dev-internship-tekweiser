"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function NewIssuePage() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [loading, setLoading] = useState<boolean>(false);

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description: desc,
        priority,
        status: "open",
      }),
    });

    setLoading(false);
    router.push("/issues");
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">New Issue</h2>
      <form onSubmit={submitHandler} className="max-w-md space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="w-full border rounded p-2"
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-semibold mb-1">Priority</label>
          <select
            className="w-full border rounded p-2"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "low" | "medium" | "high")
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
