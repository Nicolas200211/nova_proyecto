import { DayPicker } from "react-day-picker"
import type { DayPickerRangeProps, DayPickerMultipleProps, DayPickerSingleProps } from "react-day-picker"

import { cn } from "../../lib/utils"
import { buttonVariants } from "@/components/ui/button"

type CalendarClassNames = {
  months?: string
  month?: string
  caption?: string
  caption_label?: string
  nav?: string
  nav_button?: string
  nav_button_previous?: string
  nav_button_next?: string
  table?: string
  head_row?: string
  head_cell?: string
  row?: string
  cell?: string
  day?: string
  day_selected?: string
  day_today?: string
  day_outside?: string
  day_disabled?: string
  day_range_middle?: string
  day_hidden?: string
}

type CalendarBaseProps = {
  className?: string
  classNames?: CalendarClassNames
  showOutsideDays?: boolean
}

type CalendarSingleProps = Omit<DayPickerSingleProps, 'mode' | 'classNames'> & {
  mode?: 'single'
} & CalendarBaseProps

type CalendarMultipleProps = Omit<DayPickerMultipleProps, 'mode' | 'classNames'> & {
  mode: 'multiple'
} & CalendarBaseProps

type CalendarRangeProps = Omit<DayPickerRangeProps, 'mode' | 'classNames'> & {
  mode: 'range'
} & CalendarBaseProps

type CalendarProps = CalendarSingleProps | CalendarMultipleProps | CalendarRangeProps

const defaultClassNames: CalendarClassNames = {
  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
  month: "space-y-4",
  caption: "flex justify-center pt-1 relative items-center",
  caption_label: "text-sm font-medium",
  nav: "space-x-1 flex items-center",
  nav_button: cn(
    buttonVariants({ variant: "outline" }),
    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
  ),
  nav_button_previous: "absolute left-1",
  nav_button_next: "absolute right-1",
  table: "w-full border-collapse space-y-1",
  head_row: "flex",
  head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
  row: "flex w-full mt-2",
  cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
  day: cn(
    buttonVariants({ variant: "ghost" }),
    "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
  ),
  day_selected:
    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
  day_today: "bg-accent text-accent-foreground",
  day_outside: "text-muted-foreground opacity-50",
  day_disabled: "text-muted-foreground opacity-50",
  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
  day_hidden: "invisible",
}

function CalendarSingle({ className, classNames: classNamesProp, showOutsideDays = true, ...rest }: Omit<CalendarSingleProps, 'mode'>) {
  return (
    <DayPicker
      mode="single"
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        ...defaultClassNames,
        ...classNamesProp,
      }}
      {...rest}
    />
  )
}

function CalendarMultiple({ className, classNames: classNamesProp, showOutsideDays = true, ...rest }: Omit<CalendarMultipleProps, 'mode'>) {
  return (
    <DayPicker
      mode="multiple"
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        ...defaultClassNames,
        ...classNamesProp,
      }}
      {...rest}
    />
  )
}

function CalendarRange({ className, classNames: classNamesProp, showOutsideDays = true, ...rest }: Omit<CalendarRangeProps, 'mode'>) {
  return (
    <DayPicker
      mode="range"
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        ...defaultClassNames,
        ...classNamesProp,
      }}
      {...rest}
    />
  )
}

function Calendar(props: CalendarProps) {
  if (props.mode === 'multiple') {
    const { mode, ...rest } = props as CalendarMultipleProps
    return <CalendarMultiple {...rest} />
  }
  
  if (props.mode === 'range') {
    const { mode, ...rest } = props as CalendarRangeProps
    return <CalendarRange {...rest} />
  }
  
  const { mode, ...rest } = props as CalendarSingleProps
  return <CalendarSingle {...rest} />
}

Calendar.displayName = "Calendar"

export { Calendar }
