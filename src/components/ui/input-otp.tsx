import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Minus } from "lucide-react"

import { cn } from "../../lib/utils"

type InputOTPProps = {
  containerClassName?: string
  className?: string
  maxLength?: number
  value?: string
  onChange?: (value: string) => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'value'>

const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  ({ className, containerClassName, maxLength = 6, value, onChange, ...props }, ref) => {
    const renderSlots = React.useCallback(
      ({ slots }: { slots: Array<{ char: string | null; isActive: boolean }> }) => (
        <div className="flex items-center">
          {slots.map((_, index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </div>
      ),
      []
    )

    return (
      <div className={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)} {...props}>
        <OTPInput
          ref={ref}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          render={renderSlots}
          className={cn("disabled:cursor-not-allowed", className)}
        />
      </div>
    )
  }
)
InputOTP.displayName = "InputOTP"

interface InputOTPGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const InputOTPGroup = React.forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
  )
)
InputOTPGroup.displayName = "InputOTPGroup"

interface InputOTPSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number
}

const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext)
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
          isActive && "z-10 ring-1 ring-ring",
          className
        )}
        {...props}>
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
          </div>
        )}
      </div>
    )
  }
)
InputOTPSlot.displayName = "InputOTPSlot"

interface InputOTPSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const InputOTPSeparator = React.forwardRef<HTMLDivElement, InputOTPSeparatorProps>(
  ({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
      <Minus />
    </div>
  )
)
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
