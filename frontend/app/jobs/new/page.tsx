"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { useEffect } from "react";

const statusOptions = ["applied", "interview", "offer", "declined"] as const;
const jobTypeOptions = ["full-time", "part-time", "internship"] as const;

type Status = (typeof statusOptions)[number];
type JobType = (typeof jobTypeOptions)[number];

interface JobForm {
  company: string;
  position: string;
  status: Status;
  jobType: JobType;
}

export default function NewJobPage() {
  const { register, handleSubmit } = useForm<JobForm>();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.token) {
      router.push("/login");
    }
  }, [auth?.token]);

  const onSubmit = async (data: JobForm) => {
    try {
      await api.post("/jobs", data);
      router.push("/");
    } catch (err: any) {
      alert(err.response?.data?.msg || "Failed to create job");
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-xl rounded border p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold">Add New Job</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("company", { required: true })}
          placeholder="Company"
          className="w-full rounded border p-2"
        />
        <input
          {...register("position", { required: true })}
          placeholder="Position"
          className="w-full rounded border p-2"
        />
        <select {...register("status")} className="w-full rounded border p-2">
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
        <select {...register("jobType")} className="w-full rounded border p-2">
          {jobTypeOptions.map((type) => (
            <option key={type} value={type}>
              {type.replace("-", " ").replace(/^\w/, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2 text-white"
        >
          Create Job
        </button>
      </form>
    </div>
  );
}
