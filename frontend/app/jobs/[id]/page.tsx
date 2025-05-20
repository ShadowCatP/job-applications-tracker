"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { JobForm } from "@/components/Forms/JobForm";
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
  }, [auth?.token, router, auth?.loading]);

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
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mx-2 mt-10 flex justify-center">
      <section className="flex w-full max-w-xl flex-col rounded transition-colors border bg-white p-6 shadow dark:border-neutral-700 dark:bg-neutral-800">
        <h1 className="mb-6 text-2xl font-bold">Edit Job</h1>
        <JobForm job={job} />
      </section>
    </div>
  );
}
