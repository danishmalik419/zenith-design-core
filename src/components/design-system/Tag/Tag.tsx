
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const tagVariants = cva(
  "inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        tertiary: "bg-tertiary text-tertiary-foreground hover:bg-tertiary/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        success: "bg-success text-success-foreground hover:bg-success/90",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90",
        error: "bg-error text-error-foreground hover:bg-error/90",
        info: "bg-info text-info-foreground hover:bg-info/90",
      },
      size: {
        small: "text-xs px-2 py-0.5",
        default: "text-sm px-3 py-1",
        large: "text-base px-4 py-1.5",
      },
      removable: {
        true: "pr-1",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      removable: false,
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size, removable, onRemove, children, ...props }, ref) => {
    return (
      <span
        className={cn(tagVariants({ variant, size, removable, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {removable && (
          <button
            className="ml-1 rounded-full p-0.5 hover:bg-background/20 focus:outline-none focus:ring-1 focus:ring-ring"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            aria-label="Remove tag"
            type="button"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove</span>
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = "Tag";

export { Tag, tagVariants };
