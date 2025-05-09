import { Job } from "@/types/Job";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseJobDates = (job: Job): Job => ({
  ...job,
  dateApplied: job.dateApplied ? new Date(job.dateApplied) : undefined,
  interviewDates: job.interviewDates?.map((i: { date: Date }) => ({
    date: new Date(i.date),
  })),
});

export const formatDate = (date: Date | undefined): string | undefined => {
  if (!date) return undefined;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 because January = 0
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getRelativeDate = (targetDate: Date): string => {
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffInMs = targetDate.getTime() - now.getTime();
  const diffInDays = Math.ceil(diffInMs / msPerDay);

  if (diffInDays <= 0) return "0 days";
  if (diffInDays === 1) return "1 day";
  if (diffInDays < 7) return `${diffInDays} days`;
  const weeks = Math.round(diffInDays / 7);
  return `${weeks} week${weeks > 1 ? "s" : ""}`;
};
