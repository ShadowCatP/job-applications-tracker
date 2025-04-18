"use client";

import { getRelativeDate } from "@/lib/utils";
import { Job } from "@/types/Job";
import { formatDate } from "date-fns";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { JobCardHeader } from "./JobCardHeader";
import { JobCardDetails } from "./JobCardDetails";
import { StatusBar } from "./StatusBar";

interface JobCardProps {
  job: Job;
  handleDelete: () => void;
}

export const JobCard = ({ job, handleDelete }: JobCardProps) => {
  if (!job) return null;
  const [isExpanded, setIsExpanded] = useState(false);

  const closestInterview = job.interviewDates
    ?.map(({ date }) => new Date(date))
    .filter((date) => date.getDay() >= new Date().getDay())
    .sort((a, b) => a.getTime() - b.getTime())[0];

  const hasDetails =
    (job.notes && job.notes.trim() !== "") ||
    (Array.isArray(job.interviewDates) && job.interviewDates.length > 0) ||
    job.dateApplied;

  return (
    <div className="flex flex-col gap-2 rounded border border-black bg-white px-6 py-4 shadow-md transition-shadow hover:shadow-lg">
      <JobCardHeader job={job} handleDelete={handleDelete} />

      <StatusBar job={job} className="mt-2" />

      {closestInterview && (
        <div className="my-4 flex items-center gap-2">
          <Calendar size={20} />
          <div>
            Next Interview:{" "}
            <span className="font-medium capitalize">
              {getRelativeDate(closestInterview)}
            </span>
          </div>
        </div>
      )}

      {/* expand controls */}
      {hasDetails && (
        <>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex w-full cursor-pointer justify-center gap-2 transition-transform duration-300 hover:scale-105"
          >
            {isExpanded ? (
              <>
                <ChevronUp />
                Hide details
              </>
            ) : (
              <>
                <ChevronDown />
                Show Details
              </>
            )}
          </button>

          {isExpanded && <JobCardDetails job={job} />}
        </>
      )}
    </div>
  );
};
