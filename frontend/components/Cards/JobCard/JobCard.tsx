import { Job } from "@/types/Job";
import { JobCardContent } from "./JobCardContent";
import { JobCardHeader } from "./JobCardHeader";

interface JobCardProps {
  job: Job;
  handleDelete: () => void;
}

export const JobCard = ({ job, handleDelete }: JobCardProps) => {
  if (!job) return null;

  return (
    <div className="relative flex flex-col gap-4 rounded border-2 border-neutral-200 bg-white px-6 py-4 dark:border-neutral-700 dark:bg-neutral-800">
      <JobCardHeader job={job} handleDelete={handleDelete} />
      <JobCardContent job={job} />
    </div>
  );
};
