
import React, { createContext, useContext, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Context
type TabsContextValue = {
  selectedTab: string;
  setSelectedTab: (id: string) => void;
  orientation: "horizontal" | "vertical";
};

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a TabsProvider");
  }
  return context;
};

// Tab List
const tabListVariants = cva("flex", {
  variants: {
    orientation: {
      horizontal: "flex-row border-b border-border",
      vertical: "flex-col border-r border-border",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      size: "sm",
      class: "gap-1",
    },
    {
      orientation: "horizontal",
      size: "md",
      class: "gap-2",
    },
    {
      orientation: "horizontal",
      size: "lg",
      class: "gap-4",
    },
    {
      orientation: "vertical",
      size: "sm",
      class: "gap-1 pr-1",
    },
    {
      orientation: "vertical",
      size: "md",
      class: "gap-2 pr-2",
    },
    {
      orientation: "vertical",
      size: "lg",
      class: "gap-4 pr-4",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

interface TabListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabListVariants> {}

// Tab
const tabVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "text-muted-foreground hover:text-foreground data-[selected=true]:text-foreground",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground data-[selected=true]:bg-background data-[selected=true]:text-foreground data-[selected=true]:border-border",
        underline: "border-b-2 border-transparent text-muted-foreground hover:text-foreground data-[selected=true]:border-primary data-[selected=true]:text-foreground",
      },
      size: {
        sm: "text-xs h-8 px-2",
        md: "text-sm h-9 px-3",
        lg: "text-base h-10 px-4",
      },
      orientation: {
        horizontal: "",
        vertical: "",
      },
    },
    compoundVariants: [
      {
        variant: "underline",
        orientation: "horizontal",
        class: "border-b-2 rounded-none",
      },
      {
        variant: "underline",
        orientation: "vertical",
        class: "border-b-0 border-r-2 rounded-none justify-start",
      },
      {
        variant: "outline",
        orientation: "horizontal",
        class: "rounded-md border",
      },
      {
        variant: "outline",
        orientation: "vertical",
        class: "rounded-md border justify-start",
      },
      {
        variant: "default",
        orientation: "horizontal",
        class: "rounded-md",
      },
      {
        variant: "default",
        orientation: "vertical",
        class: "rounded-md justify-start",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      orientation: "horizontal",
    },
  }
);

interface TabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabVariants> {
  id: string;
  disabled?: boolean;
}

// Tab Panels
interface TabPanelsProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

// Tab Panel
interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  className?: string;
}

// Main Tabs component
interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultTab: string;
  orientation?: "horizontal" | "vertical";
  onChange?: (id: string) => void;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ children, defaultTab, orientation = "horizontal", onChange, ...props }, ref) => {
    const [selectedTab, setSelectedTab] = useState(defaultTab);

    const handleTabChange = (id: string) => {
      setSelectedTab(id);
      onChange?.(id);
    };

    return (
      <TabsContext.Provider
        value={{ selectedTab, setSelectedTab: handleTabChange, orientation }}
      >
        <div
          ref={ref}
          className={cn(
            "w-full",
            orientation === "vertical" ? "flex flex-row" : "flex flex-col"
          )}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = "Tabs";

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>(
  ({ className, orientation, size, ...props }, ref) => {
    const { orientation: contextOrientation } = useTabs();
    const orientationValue = orientation || contextOrientation;

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={orientationValue}
        className={cn(
          tabListVariants({ orientation: orientationValue, size, className })
        )}
        {...props}
      />
    );
  }
);

TabList.displayName = "TabList";

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ className, variant, size, orientation, id, disabled, ...props }, ref) => {
    const { selectedTab, setSelectedTab, orientation: contextOrientation } = useTabs();
    const isSelected = selectedTab === id;
    const orientationValue = orientation || contextOrientation;

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        aria-selected={isSelected}
        aria-controls={`tab-panel-${id}`}
        id={`tab-${id}`}
        tabIndex={isSelected ? 0 : -1}
        disabled={disabled}
        data-selected={isSelected}
        onClick={() => setSelectedTab(id)}
        className={cn(
          tabVariants({
            variant,
            size,
            orientation: orientationValue,
            className,
          })
        )}
        {...props}
      />
    );
  }
);

Tab.displayName = "Tab";

export const TabPanels = React.forwardRef<HTMLDivElement, TabPanelsProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useTabs();
    
    return (
      <div
        ref={ref}
        className={cn(
          "mt-2",
          orientation === "vertical" && "flex-1 ml-4",
          className
        )}
        {...props}
      />
    );
  }
);

TabPanels.displayName = "TabPanels";

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, id, ...props }, ref) => {
    const { selectedTab } = useTabs();
    const isSelected = selectedTab === id;

    if (!isSelected) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`tab-${id}`}
        id={`tab-panel-${id}`}
        className={cn("focus:outline-none", className)}
        {...props}
      />
    );
  }
);

TabPanel.displayName = "TabPanel";
