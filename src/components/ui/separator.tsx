import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import type { ComponentRef } from "react"
import { cn } from "../../lib/utils"

interface SeparatorProps 
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}

const Separator = React.forwardRef<
  ComponentRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ 
  className, 
  orientation = "horizontal", 
  decorative = true, 
  ...props 
}, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props} />
))
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
