"use client";

import { getRelativeDate } from "@/lib/utils";
import { Job } from "@/types/Job";
import { ChevronDown, ChevronUp, Clock, Link } from "lucide-react";
import { useState } from "react";
import { StatusBar } from "./StatusBar";

interface JobCardContentProps {
  job: Job;
}

export const JobCardContent = ({ job }: JobCardContentProps) => {
  const nextInterviewDate: Date | undefined = job.interviewDates
    ?.map(({ date }) => new Date(date))
    .filter((date) => date.getTime() >= new Date().getTime())
    .sort((a, b) => a.getTime() - b.getTime())[0];

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {job.jobLink && (
        <span className="flex items-center gap-2">
          <Link size={16} />
          <a
            href={job.jobLink}
            className="underline transition-colors hover:text-teal-600"
            target="_blank"
          >
            {job.jobLink}
          </a>
        </span>
      )}

      {nextInterviewDate && (
        <div className="flex gap-2">
          <Clock />
          <p>
            <span className="underline decoration-teal-600">
              {getRelativeDate(nextInterviewDate)}
            </span>{" "}
            until next interview
          </p>
        </div>
      )}

      <StatusBar job={job} />

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full cursor-pointer transition-transform"
      >
        {isExpanded ? (
          <>
            <ChevronUp size={24} />
            <p>Notes</p>
          </>
        ) : (
          <>
            <ChevronDown size={24} />
            <p>Notes</p>
          </>
        )}
      </button>

      {isExpanded && (
        <div className="ml-1">
          {job.notes || job.notes?.trim() !== "" ? (
            job.notes
          ) : (
            <p className="text-neutral-500">No notes for this job yet...</p>
          )}
        </div>
      )}
    </div>
  );
};
