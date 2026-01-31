import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-100 text-zinc-950 shadow-sm hover:bg-zinc-300",
        destructive:
          "bg-red-900/40 text-red-200 border border-red-900/50 hover:bg-red-900/60 shadow-sm",
        outline:
          "border border-zinc-800 bg-zinc-950 shadow-sm hover:bg-zinc-900 text-zinc-300 hover:text-white",
        secondary:
          "bg-zinc-800 text-zinc-200 shadow-sm hover:bg-zinc-700",
        ghost:
          "hover:bg-zinc-800/50 hover:text-zinc-100 text-zinc-400",
        link: "text-cyan-500 underline-offset-4 hover:underline hover:text-cyan-400",
      },
      size: {
        default: "h-10 px-5 py-2.5 has-[>svg]:px-4",
        sm: "h-9 rounded-md px-3 has-[>svg]:px-2.5 gap-1.5 text-xs",
        lg: "h-12 rounded-lg px-8 has-[>svg]:px-6 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
