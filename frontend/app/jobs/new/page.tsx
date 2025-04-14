"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { useEffect } from "react";
import { Job } from "@/types/Job";
import { JobForm } from "@/components/JobForm";

export default function NewJobPage() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.loading && !auth?.token) {
      router.push("/login");
    }
  }, [auth?.token]);

  return (
    <div className="mx-auto mt-10 max-w-xl rounded border p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold">Add New Job</h1>
      <JobForm />
    </div>
  );
}
