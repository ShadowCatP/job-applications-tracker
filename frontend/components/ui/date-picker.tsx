import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type DatePickerProps = {
  placeholder?: string;
  defaultValue?: Date;
  onChange?: (date: Date | undefined) => void;
};

export const DatePicker = ({
  placeholder,
  defaultValue,
  onChange,
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(defaultValue);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date);
            onChange?.(date);
          }}
          initialFocus
          className="bg-white dark:bg-neutral-700"
        />
      </PopoverContent>
    </Popover>
  );
};
