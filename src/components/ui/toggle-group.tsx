import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import type { ComponentRef } from "react"
import { cn } from "../../lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

type ToggleGroupContextProps = {
  size?: "default" | "sm" | "lg"
  variant?: "default" | "outline"
}

const ToggleGroupContext = React.createContext<ToggleGroupContextProps>({
  size: "default",
  variant: "default",
})

type ToggleGroupElement = ComponentRef<typeof ToggleGroupPrimitive.Root>

// Base props that are common to both single and multiple toggle groups
type ToggleGroupBaseProps = {
  size?: "default" | "sm" | "lg"
  variant?: "default" | "outline"
  className?: string
  children: React.ReactNode
  orientation?: "horizontal" | "vertical"
  disabled?: boolean
  loop?: boolean
  dir?: "ltr" | "rtl"
}

// Single selection toggle group
type ToggleGroupSingleProps = ToggleGroupBaseProps & {
  type: 'single'
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

// Multiple selection toggle group
type ToggleGroupMultipleProps = ToggleGroupBaseProps & {
  type: 'multiple'
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps

// Single selection toggle group component
const ToggleGroupSingle = React.forwardRef<ToggleGroupElement, Omit<ToggleGroupSingleProps, 'type'>>(
  ({
    className,
    variant = "default",
    size = "default",
    value,
    onValueChange,
    children,
    orientation = "horizontal",
    disabled,
    loop = true,
    dir,
    ...props
  }, ref) => {
    const contextValue = React.useMemo(
      () => ({ variant, size }),
      [variant, size]
    )

    return (
      <ToggleGroupPrimitive.Root
        ref={ref}
        type="single"
        value={value}
        onValueChange={onValueChange}
        className={cn(
          "flex items-center justify-center gap-1",
          orientation === "vertical" ? "flex-col" : "flex-row",
          className
        )}
        orientation={orientation}
        disabled={disabled}
        loop={loop}
        dir={dir}
        {...props}
      >
        <ToggleGroupContext.Provider value={contextValue}>
          {children}
        </ToggleGroupContext.Provider>
      </ToggleGroupPrimitive.Root>
    )
  }
)

// Multiple selection toggle group component
const ToggleGroupMultiple = React.forwardRef<ToggleGroupElement, Omit<ToggleGroupMultipleProps, 'type'>>(
  ({
    className,
    variant = "default",
    size = "default",
    value,
    onValueChange,
    children,
    orientation = "horizontal",
    disabled,
    loop = true,
    dir,
    ...props
  }, ref) => {
    const contextValue = React.useMemo(
      () => ({ variant, size }),
      [variant, size]
    )

    return (
      <ToggleGroupPrimitive.Root
        ref={ref}
        type="multiple"
        value={value}
        onValueChange={onValueChange}
        className={cn(
          "flex items-center justify-center gap-1",
          orientation === "vertical" ? "flex-col" : "flex-row",
          className
        )}
        orientation={orientation}
        disabled={disabled}
        loop={loop}
        dir={dir}
        {...props}
      >
        <ToggleGroupContext.Provider value={contextValue}>
          {children}
        </ToggleGroupContext.Provider>
      </ToggleGroupPrimitive.Root>
    )
  }
)

// Main ToggleGroup component that renders the appropriate variant based on the type prop
const ToggleGroup = React.forwardRef<ToggleGroupElement, ToggleGroupProps>(
  ({ type = 'single', ...props }, ref) => {
    if (type === 'multiple') {
      const { type: _, ...rest } = props as ToggleGroupMultipleProps
      return <ToggleGroupMultiple ref={ref} {...rest} />
    }
    
    const { type: __, ...rest } = props as ToggleGroupSingleProps
    return <ToggleGroupSingle ref={ref} {...rest} />
  }
)

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

type ToggleGroupItemElementProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>

type ToggleGroupItemProps = ToggleGroupItemElementProps & ToggleGroupContextProps

const ToggleGroupItem = React.forwardRef<
  ComponentRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, children, variant: propVariant, size: propSize, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)
  const variant = propVariant ?? context.variant
  const size = propSize ?? context.size

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(toggleVariants({
        variant: context.variant || variant,
        size: context.size || size,
      }), className)}
      {...props}>
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
