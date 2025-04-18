"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Job } from "@/types/Job";
import { JobCard } from "@/components/Cards/JobCard/JobCard";
import { Plus } from "lucide-react";

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
  }, [auth?.token, auth?.loading, router]);

  return (
    <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Job Applications</h1>
        <Link
          href="/jobs/new"
          className="bg-primary-600 hover:bg-primary-500 flex items-center gap-2 rounded px-4 py-2 font-semibold text-white transition-colors"
        >
          <Plus size={20} />
          New Job
        </Link>
      </div>

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
      </div>
    </div>
  );
}
