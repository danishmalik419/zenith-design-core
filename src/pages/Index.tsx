
import { useState } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Tag, TagGroup } from "@/components/design-system/Tag";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/design-system/Accordion";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@/components/design-system/Tabs";
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarItem, SidebarGroup } from "@/components/design-system/Sidebar";
import { Home, Settings, User, FileText, BookOpen, HelpCircle, Mail, Bell } from "lucide-react";

const ColorPalette = ({ title, colorPrefix }: { title: string; colorPrefix: string }) => (
  <div className="space-y-3">
    <h3 className="text-lg font-semibold">{title}</h3>
    <div className="grid grid-cols-6 gap-2">
      {["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"].map((shade) => (
        <div key={shade} className="space-y-1.5">
          <div
            className={`h-10 w-full rounded-md bg-${colorPrefix}-${shade}`}
            style={{ 
              backgroundColor: `hsl(var(--${colorPrefix}-${shade}))`,
              border: shade === "50" ? "1px solid hsl(var(--border))" : undefined
            }}
          />
          <div className="text-xs">{shade}</div>
        </div>
      ))}
    </div>
  </div>
);

const SemanticColors = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {["success", "warning", "error", "info"].map((color) => (
      <div key={color} className="space-y-1.5">
        <div
          className={`h-10 w-full rounded-md`}
          style={{ backgroundColor: `hsl(var(--${color}))` }}
        />
        <div className="capitalize text-sm font-medium">{color}</div>
      </div>
    ))}
  </div>
);

const UIColors = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {["background", "foreground", "card", "card-foreground", "popover", "popover-foreground", "border", "input", "muted", "muted-foreground", "accent", "accent-foreground"].map((color) => (
      <div key={color} className="space-y-1.5">
        <div
          className={`h-10 w-full rounded-md border border-border`}
          style={{ backgroundColor: `hsl(var(--${color}))` }}
        />
        <div className="capitalize text-sm font-medium">{color.replace("-", " ")}</div>
      </div>
    ))}
  </div>
);

const TagShowcase = () => (
  <div className="space-y-8">
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Tag Variants</h3>
      <TagGroup>
        <Tag variant="default">Default</Tag>
        <Tag variant="secondary">Secondary</Tag>
        <Tag variant="tertiary">Tertiary</Tag>
        <Tag variant="outline">Outline</Tag>
        <Tag variant="success">Success</Tag>
        <Tag variant="warning">Warning</Tag>
        <Tag variant="error">Error</Tag>
        <Tag variant="info">Info</Tag>
      </TagGroup>
    </div>
    
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Tag Sizes</h3>
      <TagGroup>
        <Tag size="small">Small</Tag>
        <Tag size="default">Default</Tag>
        <Tag size="large">Large</Tag>
      </TagGroup>
    </div>
    
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Removable Tags</h3>
      <TagGroup>
        <Tag removable onRemove={() => console.log("removed")}>Removable</Tag>
        <Tag variant="secondary" removable onRemove={() => console.log("removed")}>Secondary</Tag>
        <Tag variant="success" removable onRemove={() => console.log("removed")}>Success</Tag>
      </TagGroup>
    </div>
  </div>
);

const AccordionShowcase = () => (
  <div className="space-y-8">
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Single Expansion</h3>
      <Accordion variant="single" defaultExpanded={["item-1"]}>
        <AccordionItem id="item-1">
          <AccordionTrigger id="item-1">What is Zenith UI?</AccordionTrigger>
          <AccordionContent id="item-1">
            Zenith UI is a design system built with React, TypeScript, and Tailwind CSS. It provides a set of accessible, reusable components that follow design best practices.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="item-2">
          <AccordionTrigger id="item-2">How do I install it?</AccordionTrigger>
          <AccordionContent id="item-2">
            You can install Zenith UI via npm or yarn. Simply run npm install zenith-ui or yarn add zenith-ui.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="item-3">
          <AccordionTrigger id="item-3">Is it accessible?</AccordionTrigger>
          <AccordionContent id="item-3">
            Yes! All components in Zenith UI are designed with accessibility in mind and follow WAI-ARIA standards.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
    
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Multiple Expansion</h3>
      <Accordion variant="multiple" defaultExpanded={["item-1", "item-3"]}>
        <AccordionItem id="item-1">
          <AccordionTrigger id="item-1">First Item</AccordionTrigger>
          <AccordionContent id="item-1">
            This is the first item's content. You can have multiple items expanded at once.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="item-2">
          <AccordionTrigger id="item-2">Second Item</AccordionTrigger>
          <AccordionContent id="item-2">
            This is the second item's content. Click on multiple headers to expand them simultaneously.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="item-3">
          <AccordionTrigger id="item-3">Third Item</AccordionTrigger>
          <AccordionContent id="item-3">
            This is the third item's content. All items can be expanded or collapsed independently.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
);

const TabsShowcase = () => (
  <div className="space-y-8">
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Default Tabs</h3>
      <Tabs defaultTab="tab1">
        <TabList>
          <Tab id="tab1">Account</Tab>
          <Tab id="tab2">Password</Tab>
          <Tab id="tab3">Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel id="tab1">
            <div className="p-4 rounded-md bg-card">
              <h4 className="font-medium mb-2">Account Settings</h4>
              <p className="text-sm text-muted-foreground">Manage your account details and preferences.</p>
            </div>
          </TabPanel>
          <TabPanel id="tab2">
            <div className="p-4 rounded-md bg-card">
              <h4 className="font-medium mb-2">Password Settings</h4>
              <p className="text-sm text-muted-foreground">Update your password and security preferences.</p>
            </div>
          </TabPanel>
          <TabPanel id="tab3">
            <div className="p-4 rounded-md bg-card">
              <h4 className="font-medium mb-2">General Settings</h4>
              <p className="text-sm text-muted-foreground">Configure app settings and display preferences.</p>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
    
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Underline Tabs</h3>
      <Tabs defaultTab="tab1">
        <TabList>
          <Tab id="tab1" variant="underline">Daily</Tab>
          <Tab id="tab2" variant="underline">Weekly</Tab>
          <Tab id="tab3" variant="underline">Monthly</Tab>
        </TabList>
        <TabPanels>
          <TabPanel id="tab1">
            <div className="p-4 rounded-md bg-card">
              <h4 className="font-medium mb-2">Daily Report</h4>
              <p className="text-sm text-muted-foreground">View your daily activity and statistics.</p>
            </div>
          </TabPanel>
          <TabPanel id="tab2">
            <div className="p-4 rounded-md bg-card">
              <h4 className="font-medium mb-2">Weekly Report</h4>
              <p className="text-sm text-muted-foreground">View your weekly performance and trends.</p>
            </div>
          </TabPanel>
          <TabPanel id="tab3">
            <div className="p-4 rounded-md bg-card">
              <h4 className="font-medium mb-2">Monthly Report</h4>
              <p className="text-sm text-muted-foreground">View your monthly insights and analysis.</p>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
    
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Vertical Tabs</h3>
      <Tabs defaultTab="tab1" orientation="vertical">
        <TabList>
          <Tab id="tab1">General</Tab>
          <Tab id="tab2">Appearance</Tab>
          <Tab id="tab3">Notifications</Tab>
        </TabList>
        <TabPanels>
          <TabPanel id="tab1">
            <div className="p-4 rounded-md bg-card">
              <h4 className="font-medium mb-2">General Settings</h4>
              <p className="text-sm text-muted-foreground">Configure general app settings and preferences.</p>
            </div>
          </TabPanel>
          <TabPanel id="tab2">
            <div className="p-4 rounded-md bg-card">
              <h4 className="font-medium mb-2">Appearance Settings</h4>
              <p className="text-sm text-muted-foreground">Customize the look and feel of your interface.</p>
            </div>
          </TabPanel>
          <TabPanel id="tab3">
            <div className="p-4 rounded-md bg-card">
              <h4 className="font-medium mb-2">Notification Settings</h4>
              <p className="text-sm text-muted-foreground">Manage how and when you receive notifications.</p>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
);

const SidebarShowcase = () => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="border border-border rounded-md overflow-hidden h-[500px] flex">
      <Sidebar defaultExpanded={expanded}>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup title="Main">
            <SidebarItem href="#" icon={Home} active>Dashboard</SidebarItem>
            <SidebarItem href="#" icon={Mail}>Inbox</SidebarItem>
            <SidebarItem href="#" icon={FileText}>Documents</SidebarItem>
          </SidebarGroup>
          <SidebarGroup title="Account">
            <SidebarItem href="#" icon={User}>Profile</SidebarItem>
            <SidebarItem href="#" icon={Settings}>Settings</SidebarItem>
            <SidebarItem href="#" icon={Bell} badge="3">Notifications</SidebarItem>
          </SidebarGroup>
          <SidebarGroup title="Support">
            <SidebarItem href="#" icon={HelpCircle}>Help</SidebarItem>
            <SidebarItem href="#" icon={BookOpen}>Documentation</SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-muted-foreground">Welcome to the demonstration dashboard.</p>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 bg-card rounded-md border border-border">
                <h3 className="font-medium">Card {i}</h3>
                <p className="text-sm text-muted-foreground">Sample dashboard card content</p>
              </div>
            ))}
          </div>
          <div className="bg-card p-4 rounded-md border border-border">
            <h3 className="font-medium mb-2">Recent Activity</h3>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-2 text-sm border-b border-border last:border-0">
                  Activity item {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background">
        <header className="border-b border-border">
          <div className="container mx-auto p-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Zenith Design System</h1>
            <ThemeToggle />
          </div>
        </header>
        
        <main className="container mx-auto py-8 px-4">
          <div className="prose prose-gray dark:prose-invert max-w-none mb-10">
            <h2 className="text-3xl font-bold mb-4">Enterprise Design System</h2>
            <p className="text-muted-foreground text-lg">
              A comprehensive set of components and guidelines for creating consistent, accessible, and beautiful user interfaces.
            </p>
          </div>
          
          <div className="space-y-16">
            {/* Color System */}
            <section id="colors">
              <h2 className="text-2xl font-bold mb-6">Color System</h2>
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Primary, Secondary, Tertiary Colors</h3>
                  <div className="space-y-8">
                    <ColorPalette title="Primary Colors" colorPrefix="primary" />
                    <ColorPalette title="Secondary Colors" colorPrefix="secondary" />
                    <ColorPalette title="Tertiary Colors" colorPrefix="tertiary" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Semantic Colors</h3>
                  <SemanticColors />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">UI Colors</h3>
                  <UIColors />
                </div>
              </div>
            </section>
            
            {/* Components */}
            <section id="components">
              <h2 className="text-2xl font-bold mb-6">Components</h2>
              
              <Tabs defaultTab="tags">
                <TabList>
                  <Tab id="tags">Tags</Tab>
                  <Tab id="accordion">Accordion</Tab>
                  <Tab id="tabs">Tabs</Tab>
                  <Tab id="sidebar">Sidebar</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel id="tags">
                    <div className="p-6 border border-border rounded-md bg-card mt-4">
                      <TagShowcase />
                    </div>
                  </TabPanel>
                  <TabPanel id="accordion">
                    <div className="p-6 border border-border rounded-md bg-card mt-4">
                      <AccordionShowcase />
                    </div>
                  </TabPanel>
                  <TabPanel id="tabs">
                    <div className="p-6 border border-border rounded-md bg-card mt-4">
                      <TabsShowcase />
                    </div>
                  </TabPanel>
                  <TabPanel id="sidebar">
                    <div className="p-6 border border-border rounded-md bg-card mt-4">
                      <SidebarShowcase />
                    </div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </section>
          </div>
        </main>
        
        <footer className="py-6 border-t border-border">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            Zenith Design System © 2025. Built with React, TypeScript, and Tailwind CSS.
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
