"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { useEffect } from "react";
import { JobForm, statusOptions, jobTypeOptions } from "@/types/JobForm";

export default function NewJobPage() {
  const { register, handleSubmit, control } = useForm<JobForm>({
    defaultValues: {
      interviewDates: [{ date: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "interviewDates",
  });

  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.token) {
      router.push("/login");
    }
  }, [auth?.token]);

  const onSubmit = async (data: JobForm) => {
    try {
      console.log(data);
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

        <input
          {...register("dateApplied")}
          type="date"
          className="w-full rounded border p-2"
        />

        <div className="space-y-2">
          <label className="block font-medium">Interview Dates:</label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                type="date"
                {...register(`interviewDates.${index}.date`)}
                className="w-full rounded border p-2"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ date: "" })}
            className="text-blue-600 underline"
          >
            + Add another date
          </button>
        </div>

        <textarea
          {...register("notes")}
          placeholder="Notes (e.g. recruiter name, feedback, etc.)"
          className="w-full rounded border p-2"
          rows={3}
        />

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
