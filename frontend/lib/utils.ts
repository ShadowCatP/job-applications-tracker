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

export const toInputDateString = (date?: Date) => {
  return date ? date.toISOString().split("T")[0] : undefined;
};

export const getRelativeDate = (targetDate: Date): string => {
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffInMs = targetDate.getTime() - now.getTime();
  const diffInDays = Math.ceil(diffInMs / msPerDay);

  if (diffInDays <= 0) return "today";
  if (diffInDays === 1) return "tomorrow";
  if (diffInDays < 7) return `in ${diffInDays} days`;
  const weeks = Math.round(diffInDays / 7);
  return `in ${weeks} week${weeks > 1 ? "s" : ""}`;
};
