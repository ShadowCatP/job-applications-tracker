"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { JobForm } from "@/components/JobForm";
import { Job } from "@/types/Job";
import { api } from "@/lib/api";
import { parseJobDates } from "@/lib/utils";

export default function EditJobPage() {
  const router = useRouter();
  const { id } = useParams();
  const auth = useAuth();
  const [job, setJob] = useState<Job | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth?.loading && !auth?.token) {
      router.push("/login");
    }
  }, [auth?.token]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        const job = parseJobDates(res.data);
        setJob(job);
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mx-auto mt-10 max-w-xl rounded border p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold">Edit Job</h1>
      <JobForm job={job} />
    </div>
  );
}
