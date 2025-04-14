import { Job } from "@/types/Job";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseJobDates = (job: any): Job => ({
  ...job,
  dateApplied: job.dateApplied ? new Date(job.dateApplied) : undefined,
  interviewDates: job.interviewDates?.map((i: any) => ({
    date: new Date(i.date),
  })),
});
