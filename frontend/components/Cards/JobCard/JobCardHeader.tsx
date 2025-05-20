import { ConfirmButton } from "@/components/ui/confirm-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Job } from "@/types/Job";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";

interface JobCardHeaderProps {
  job: Job;
  handleDelete: () => void;
}

export const JobCardHeader = ({ job, handleDelete }: JobCardHeaderProps) => {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-3xl font-semibold">{job.position}</h2>
        <p className="text-lg font-medium text-neutral-500">{job.company}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-32 dark:border-neutral-600 dark:bg-neutral-700"
        >
          <DropdownMenuItem>
            <Link
              href={`/jobs/${job._id}`}
              className="flex w-full items-center gap-2 px-3 py-2 text-center text-sm"
            >
              <Edit size={20} />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* Avoid closing dropdown when pressing delete button */}
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <ConfirmButton
              onClick={handleDelete}
              className="w-full justify-start bg-transparent text-red-800 shadow-none hover:bg-transparent dark:text-red-500"
            >
              <Trash2 className="text-red-800 dark:text-red-500" size={20} />
              Delete
            </ConfirmButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
