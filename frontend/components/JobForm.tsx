"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Job, statusOptions, jobTypeOptions } from "@/types/Job";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "./ui/select";
import { DatePicker } from "./ui/date-picker";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface JobFormProps {
  job?: Job;
}

type JobFormValues = Omit<Job, "dateApplied" | "interviewDates"> & {
  dateApplied?: string;
  interviewDates?: { date: string }[];
};

export const JobForm = ({ job }: JobFormProps) => {
  const { register, handleSubmit, control, setValue } = useForm<JobFormValues>({
    defaultValues: job
      ? {
          company: job.company,
          position: job.position,
          status: job.status,
          jobType: job.jobType,
          dateApplied: job.dateApplied
            ? job.dateApplied.toISOString().split("T")[0]
            : undefined,
          interviewDates: job.interviewDates?.map((d) => ({
            date: d.date.toISOString().split("T")[0],
          })),
          notes: job.notes,
        }
      : undefined,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "interviewDates",
  });
  const router = useRouter();

  const onSubmit = async (data: JobFormValues) => {
    if (job) {
      await api.put(`/jobs/${job._id}`, { ...data, _id: job._id });
    } else {
      await api.post(`/jobs`, data);
    }
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        {...register("company", { required: true })}
        placeholder="Company"
      />

      <Input
        {...register("position", { required: true })}
        placeholder="Position"
      />

      <Select
        defaultValue={job ? job.status : undefined}
        onValueChange={(value: JobFormValues["status"]) =>
          setValue("status", value)
        }
      >
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent {...register("status")}>
          {statusOptions.map((status) => (
            <SelectItem key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        defaultValue={job ? job.jobType : undefined}
        onValueChange={(value: JobFormValues["jobType"]) =>
          setValue("jobType", value)
        }
      >
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent>
          {jobTypeOptions.map((type) => (
            <SelectItem key={type} value={type}>
              {type.replace("-", " ").replace(/^\w/, (c) => c.toUpperCase())}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DatePicker
        placeholder="When you applied?"
        defaultValue={job ? job.dateApplied : undefined}
        onChange={(date) => {
          if (date) {
            setValue("dateApplied", date.toISOString());
          }
        }}
      />

      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-between">
          <label>Interview Dates</label>
          <Button type="button" onClick={() => append({ date: "" })}>
            Add another date
          </Button>
        </div>

        {fields.map((f, i) => (
          <div key={f.id} className="flex w-full justify-between">
            <DatePicker
              placeholder="Interview"
              defaultValue={job ? job.interviewDates?.[i].date : undefined}
              onChange={(date) => {
                if (date) {
                  setValue(`interviewDates.${i}.date`, date.toISOString());
                }
              }}
            />
            <Button
              type="button"
              className="bg-red-400 hover:bg-red-300"
              onClick={() => remove(i)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <Textarea
        {...register("notes")}
        placeholder="Notes (e.g. recruiter name, feedback, etc.)"
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};
