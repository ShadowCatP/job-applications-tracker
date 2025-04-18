import { Job } from "@/types/Job";
import { formatDate } from "date-fns";
import { Calendar, Clock, FileText } from "lucide-react";

interface JobCardDetailsProps {
  job: Job;
}

export const JobCardDetails = ({ job }: JobCardDetailsProps) => {
  return (
    <div className="mt-4 flex flex-col gap-6 border-t border-gray-200 pt-6">
      {job.interviewDates && job.interviewDates.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Clock size={20} />
            <h3 className="text-lg">Interview Dates</h3>
          </div>
          <ul>
            {job.interviewDates.map((interview, index) => (
              <li key={`${interview}-${index}`} className="ml-6 list-disc">
                {formatDate(interview.date, "dd MMM yyyy")}
              </li>
            ))}
          </ul>
        </div>
      )}

      {job.dateApplied && (
        <div className="flex gap-2">
          <Calendar size={20} />
          Applied: {formatDate(job.dateApplied, "dd MMM yyyy")}
        </div>
      )}

      {job.notes && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <FileText size={20} />
            Notes
          </div>
          <p className="ml-1">{job.notes}</p>
        </div>
      )}
    </div>
  );
};
