import { ConfirmButton } from "@/components/ui/confirm-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Job } from "@/types/Job";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import Link from "next/link";

interface JobCardHeaderProps {
  job: Job;
  handleDelete: () => void;
}

export const JobCardHeader = ({ job, handleDelete }: JobCardHeaderProps) => {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-3xl font-semibold">{job.position}</h3>
        <p className="text-sm font-medium text-neutral-600">{job.company}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
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
              className="w-full justify-start bg-transparent text-red-800 shadow-none hover:bg-transparent"
            >
              <Trash2 className="text-red-800" size={20} />
              Delete
            </ConfirmButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
