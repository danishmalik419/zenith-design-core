
import React from "react";
import { cn } from "@/lib/utils";

interface TagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "compact" | "default" | "loose";
}

const TagGroup = React.forwardRef<HTMLDivElement, TagGroupProps>(
  ({ className, spacing = "default", children, ...props }, ref) => {
    const spacingClasses = {
      compact: "gap-1",
      default: "gap-2",
      loose: "gap-3",
    };

    return (
      <div
        className={cn(
          "flex flex-wrap items-center",
          spacingClasses[spacing],
          className
        )}
        ref={ref}
        role="group"
        {...props}
      >
        {children}
      </div>
    );
  }
);

TagGroup.displayName = "TagGroup";

export { TagGroup };
