import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";

// Menu items.
const items = [
    {
        title: "Day 1 - Safe Cracking",
        url: "/days/day-1",
    },
    {
        title: "Day 2 - Repeating Numbers",
        url: "/days/day-2",
    },
    {
        title: "Day 3 - Batteries",
        url: "/days/day-3",
    },
    {
        title: "Day 4 - Paper Rolls",
        url: "/days/day-4",
    },
    {
        title: "Day 5 - Inventory Management",
        url: "/days/day-5",
    },
    {
        title: "Day 6 - Math Homework",
        url: "/days/day-6",
    },
];

export async function AppSidebar() {
    "use cache";
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <Link href="/" className="text-lg font-sans">
                            Advent of code 2025
                        </Link>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <span className="text-md font-sans">
                                                {item.title}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <ThemeToggle />
                <span className="text-md font-sans">
                    &copy; {new Date().getFullYear()} Bram Gussekloo
                </span>
            </SidebarFooter>
        </Sidebar>
    );
}
