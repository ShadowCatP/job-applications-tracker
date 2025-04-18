"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Job } from "@/types/Job";
import { JobCard } from "@/components/Cards/JobCard/JobCard";

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
        <div className="flex flex-col gap-6">
          {jobs.map((j) => (
            <JobCard
              key={j._id}
              job={j}
              handleDelete={async () => {
                api.delete(`/jobs/${j._id}`);
                setJobs(jobs.filter((job) => job._id !== j._id));
              }}
            />
          ))}
          <p>
            <Link href="/jobs/new" className="text-blue-600 underline">
              Add one
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
