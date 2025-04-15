"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Job {
  _id: string;
  company: string;
  position: string;
  status: string;
}

export default function Home() {
  const auth = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data);
      } catch {
        setJobs([]);
      }
    };

    if (auth?.token) fetchJobs();

    if (!auth?.token && !auth?.loading) router.push("/login");
  }, [auth?.token]);

  return (
    <div className="mx-auto mt-10 max-w-4xl p-6">
      <h1 className="mb-4 text-3xl font-bold">Your Job Applications</h1>
      {jobs.length === 0 ? (
        <p>
          No jobs yet.{" "}
          <Link href="/jobs/new" className="text-blue-600 underline">
            Add one
          </Link>
        </p>
      ) : (
        <>
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li key={job._id} className="rounded border p-4 shadow">
                <h2 className="text-xl font-semibold">
                  {job.position} @ {job.company}
                </h2>
                <p>
                  Status:{" "}
                  <span className="font-medium capitalize">{job.status}</span>
                </p>
                <div className="mt-2 text-sm text-gray-500">
                  <Link
                    href={`/jobs/${job._id}`}
                    className="mr-4 text-blue-600 underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={async () => {
                      if (!confirm("Are you sure you want to delete this job?"))
                        return;
                      try {
                        await api.delete(`/jobs/${job._id}`);
                        setJobs(jobs.filter((j) => j._id !== job._id));
                      } catch {
                        alert("Failed to delete job");
                      }
                    }}
                    className="text-red-600 underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p>
            <Link href="/jobs/new" className="text-blue-600 underline">
              Add one
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
