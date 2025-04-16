"use client";

import { Job } from "@/types/Job";
import Link from "next/link";
import { ConfirmButton } from "../ui/confirm-button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { getRelativeDate } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  handleDelete: () => void;
}

export const JobCard = ({ job, handleDelete }: JobCardProps) => {
  if (!job) return null;

  const closestInterview = job.interviewDates
    ?.map(({ date }) => new Date(date))
    .filter((date) => date.getDay() >= new Date().getDay())
    .sort((a, b) => a.getTime() - b.getTime())[0];

  return (
    <div className="flex flex-col gap-3 rounded border border-black px-4 py-2 shadow-md">
      <div className="flex justify-between">
        <h2 className="text-2xl">
          {job.position} @ {job.company}
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-30">
            <DropdownMenuItem>
              <Link
                href={`/jobs/${job._id}`}
                className="inline-flex w-full justify-center rounded bg-blue-500 text-white transition-colors hover:bg-blue-400"
              >
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ConfirmButton
                onClick={handleDelete}
                className="w-full bg-red-400 hover:bg-red-300"
              >
                Delete
              </ConfirmButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p>
        Status: <span className="font-semibold capitalize">{job.status}</span>
      </p>

      {closestInterview && (
        <p>
          Next Interview:{" "}
          <span className="font-medium">
            {getRelativeDate(closestInterview)}
          </span>
        </p>
      )}
    </div>
  );
};
