export const statusOptions = [
  "applied",
  "interview",
  "offer",
  "declined",
] as const;
export const jobTypeOptions = ["full-time", "part-time", "internship"] as const;

type Status = (typeof statusOptions)[number];
type JobType = (typeof jobTypeOptions)[number];

export interface JobForm {
  company: string;
  position: string;
  status: Status;
  jobType: JobType;
}
