export const statusOptions = [
  "applied",
  "interview",
  "offer",
  "declined",
] as const;
export const jobTypeOptions = ["full-time", "part-time", "internship"] as const;

type Status = (typeof statusOptions)[number];
type JobType = (typeof jobTypeOptions)[number];

export interface Job {
  _id: string;
  company: string;
  position: string;
  jobLink: string;
  status: Status;
  jobType: JobType;
  dateApplied?: Date;
  interviewDates?: { date: Date }[];
  notes?: string;
}
