"use client";

import { useAuth } from "@/context/AuthContext";
import { JobForm, statusOptions, jobTypeOptions } from "@/types/JobForm";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";

export default function EditJobPage() {
  const router = useRouter();
  const { id } = useParams();
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm<JobForm>();

  useEffect(() => {
    if (!auth?.token) {
      router.push("/login");
    }
  }, [auth?.token]);

  useEffect(() => {
    console.log("0");
    console.log(id);
    console.log(Array.isArray(id));
    if (!id || Array.isArray(id)) return;
    console.log("1");

    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs`);
        console.log(res);
        const job = res.data.find((j: any) => j._id === id);
        console.log(job);
        if (!job) return router.push("/");
        reset(job);
      } catch (err) {
        alert("Could not load job");
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, reset]);

  const onSubmit = async (data: JobForm) => {
    try {
      await api.put(`/jobs/${id}`, data);
      router.push("/");
    } catch (err: any) {
      alert(err.response?.data?.msg || "Failed to update job");
    }
  };

  if (loading) return <p className="mt-10 text-center">Loading...</p>;

  return (
    <div className="mx-auto mt-10 max-w-xl rounded border p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold">Edit Job</h1>
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
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="w-full rounded bg-green-600 px-4 py-2 text-white"
          >
            Save Changes
          </button>
          <button
            onClick={async () => {
              if (!confirm("Delete this job?")) return;
              try {
                await api.delete(`/jobs/${id}`);
                router.push("/");
              } catch {
                alert("Failed to delete job");
              }
            }}
            className="w-full rounded bg-red-600 px-4 py-2 text-white"
          >
            Delete Job
          </button>
        </div>
      </form>
    </div>
  );
}
