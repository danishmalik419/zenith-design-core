
import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const AccordionContext = createContext<{
  expandedItems: string[];
  toggleItem: (id: string) => void;
  variant: "single" | "multiple";
}>({
  expandedItems: [],
  toggleItem: () => {},
  variant: "single",
});

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "single" | "multiple";
  defaultExpanded?: string[];
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      children,
      className,
      variant = "single",
      defaultExpanded = [],
      ...props
    },
    ref
  ) => {
    const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpanded);

    const toggleItem = (id: string) => {
      if (variant === "single") {
        setExpandedItems(expandedItems.includes(id) ? [] : [id]);
      } else {
        setExpandedItems(
          expandedItems.includes(id)
            ? expandedItems.filter((item) => item !== id)
            : [...expandedItems, id]
        );
      }
    };

    return (
      <AccordionContext.Provider value={{ expandedItems, toggleItem, variant }}>
        <div
          ref={ref}
          className={cn("divide-y divide-border rounded-md", className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = "Accordion";

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  disabled?: boolean;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, children, id, disabled = false, ...props }, ref) => {
    const { expandedItems } = useContext(AccordionContext);
    const isExpanded = expandedItems.includes(id);

    return (
      <div
        ref={ref}
        data-state={isExpanded ? "open" : "closed"}
        className={cn(
          "overflow-hidden transition-all",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

interface AccordionTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  id: string;
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, id, ...props }, ref) => {
    const { expandedItems, toggleItem } = useContext(AccordionContext);
    const isExpanded = expandedItems.includes(id);

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => toggleItem(id)}
        aria-expanded={isExpanded}
        className={cn(
          "flex w-full items-center justify-between py-4 px-5 font-medium text-left transition-all hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
    );
  }
);

AccordionTrigger.displayName = "AccordionTrigger";

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, id, ...props }, ref) => {
    const { expandedItems } = useContext(AccordionContext);
    const isExpanded = expandedItems.includes(id);

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden text-sm transition-all",
          isExpanded ? "animate-accordion-down" : "animate-accordion-up h-0"
        )}
        hidden={!isExpanded}
        {...props}
      >
        <div className="pb-4 px-5 pt-0">{children}</div>
      </div>
    );
  }
);

AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
