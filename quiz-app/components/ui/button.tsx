import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-semibold ring-offset-background transition-all duration-200 lux-shadow lux-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#e52d27] to-[#b31217] text-white border-0 shadow-[0_4px_24px_0_rgba(230,194,0,0.18)] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-[#fffbe6]/60 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 hover:scale-105 hover:shadow-[0_8px_32px_0_rgba(230,194,0,0.28)] active:scale-98 active:shadow-[0_2px_8px_0_rgba(230,194,0,0.10)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-[#e6c200] text-[#b31217] bg-transparent hover:bg-[#fffbe6] hover:text-[#b31217] hover:shadow-lg hover:scale-105",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[#fffbe6] hover:text-[#b31217] hover:shadow-lg hover:scale-105",
        ghost: "hover:bg-[#fffbe6] hover:text-[#b31217] hover:shadow-lg hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-8 py-2",
        sm: "h-10 rounded-full px-5",
        lg: "h-14 rounded-full px-12 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
