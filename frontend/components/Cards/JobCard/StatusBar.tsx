import { Job } from "@/types/Job";

interface StatusBarProps {
  job: Job;
  className?: string;
}

const statusColors = {
  applied: "bg-blue-100 text-blue-800",
  interview: "bg-orange-100 text-orange-800",
  offer: "bg-green-100 text-green-800",
  declined: "bg-red-100 text-red-800",
};

const jobTypeColors = {
  "full-time": "bg-purple-100 text-purple-800",
  "part-time": "bg-teal-100 text-teal-800",
  internship: "bg-slate-100 text-slate-800",
};

export const StatusBar = ({ job, className }: StatusBarProps) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      <p
        className={`rounded-full px-4 py-1 text-sm font-semibold capitalize ${statusColors[job.status]}`}
      >
        {job.status}
      </p>
      <p
        className={`rounded-full px-4 py-1 text-sm font-semibold capitalize ${jobTypeColors[job.jobType]}`}
      >
        {job.jobType}
      </p>
    </div>
  );
};
