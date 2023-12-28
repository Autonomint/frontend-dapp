import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        primary:
          "border-borderBlue rounded-[100px] border bg-[linear-gradient(180deg,_#00679F_0%,#041A50_100%)] shadow-[0px_2px_4px 0px_rgba(0,0,0,0.25)]",
        default:
          "bg-slate-900 text-slate-50 shadow hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        destructive:
          "bg-red-500 text-slate-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        outline:
          "border border-borderGrey rounded-[100px] bg-transparent shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        secondary:
          "bg-[linear-gradient(180deg,#FFF_-0.23%,#EEE_100%)] rounded-[8px] text-[#0f0f0f] text-base shadow-sm hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        ghost:
          " hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        ghostOutline:
          "border border-borderGrey rounded-[100px] bg-transparent shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
        showMore: " bg-transparent hover:bg-slate-300 ",
        toastClose:"bg-transparent rounded-r"
      },
      size: {
        primary: "min-[1440px]:px-5 min-[1440px]:py-[10px] 2dppx:px-[10px] 2dppx:py-[5px] px-[10px] py-[5px]",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
        full:"h-full px-5 py-[10px]",
        toastSize:"h-full p-[10px]",
        row:'px-[10px] py-[6px] h-auto',
        arrow:'px-[10px] py-[4px] h-auto rounded-none',
        timeline:'p-[5px] rounded-none h-auto',
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "primary",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
