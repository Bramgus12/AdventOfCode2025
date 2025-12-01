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
        title: "Day 1",
        url: "/days/day-1",
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
