"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Job {
  _id: string;
  company: string;
  position: string;
  status: string;
}

export default function Home() {
  const auth = useAuth();
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

    if (auth?.token) {
      fetchJobs();
    }
  }, [auth?.token]);

  if (!auth?.token) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold">Welcome to Job Tracker</h1>
        <p className="mb-6 text-gray-600">
          Track your job applications with ease.
        </p>
        <div className="space-x-4">
          <Link href="/login">
            <button className="rounded bg-green-600 px-4 py-2 text-white">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="rounded bg-blue-600 px-4 py-2 text-white">
              Register
            </button>
          </Link>
        </div>
      </div>
    );
  }

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
