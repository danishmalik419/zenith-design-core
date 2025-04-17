
import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SidebarContextType = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultExpanded?: boolean;
  position?: "left" | "right";
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    { 
      className, 
      children, 
      defaultExpanded = true, 
      position = "left",
      ...props 
    }, 
    ref
  ) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    return (
      <SidebarContext.Provider value={{ expanded, setExpanded }}>
        <div
          ref={ref}
          className={cn(
            "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
            expanded ? "w-64" : "w-16",
            position === "right" && "border-l border-r-0 ml-auto",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    );
  }
);

Sidebar.displayName = "Sidebar";

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const { expanded } = useSidebar();

    return (
      <div
        ref={ref}
        className={cn(
          "flex h-14 items-center border-b border-sidebar-border px-4",
          className
        )}
        {...props}
      >
        {children || (
          <div className={cn("flex items-center", expanded ? "justify-start" : "justify-center", "w-full")}>
            {expanded ? (
              <span className="font-semibold text-sidebar-foreground">Zenith UI</span>
            ) : (
              <span className="font-bold text-sidebar-foreground">Z</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

SidebarHeader.displayName = "SidebarHeader";

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 overflow-auto py-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarContent.displayName = "SidebarContent";

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, children, ...props }, ref) => {
    const { expanded, setExpanded } = useSidebar();

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center border-t border-sidebar-border p-2",
          className
        )}
        {...props}
      >
        {children || (
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-center p-2 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {expanded ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    );
  }
);

SidebarFooter.displayName = "SidebarFooter";

interface SidebarItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  icon: React.ElementType;
  active?: boolean;
  href: string;
  badge?: string | number;
}

export const SidebarItem = React.forwardRef<HTMLAnchorElement, SidebarItemProps>(
  ({ className, children, icon: Icon, active, href, badge, ...props }, ref) => {
    const { expanded } = useSidebar();

    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          "flex items-center py-2 px-3 my-1 mx-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          active && "bg-sidebar-accent font-medium",
          className
        )}
        {...props}
      >
        <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
        {expanded && (
          <span className="ml-3 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {children}
          </span>
        )}
        {expanded && badge && (
          <span className="ml-auto inline-flex items-center justify-center rounded-full bg-sidebar-primary px-2 py-0.5 text-xs font-medium text-sidebar-primary-foreground">
            {badge}
          </span>
        )}
      </a>
    );
  }
);

SidebarItem.displayName = "SidebarItem";

interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, children, title, ...props }, ref) => {
    const { expanded } = useSidebar();

    return (
      <div ref={ref} className={cn("py-2", className)} {...props}>
        {title && expanded && (
          <h3 className="mb-1 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {title}
          </h3>
        )}
        <div className="space-y-1">{children}</div>
      </div>
    );
  }
);

SidebarGroup.displayName = "SidebarGroup";
