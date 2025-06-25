import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    Bell,
} from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from 'react-router-dom';

// Menu items.
const items = [
    {
        title: "Overview",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Products",
        url: "/products",
        icon: Package,
    },
    {
        title: "Orders",
        url: "/orders",
        icon: ShoppingCart,
    },
    {
        title: "Notifications",
        url: "/notifications",
        icon: Bell,
    },
    {
        title: "Users",
        url: "/users",
        icon: Users,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
]

export function AppSidebar() {
    const location = useLocation().pathname

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader className='border-b'>
                <SidebarGroupLabel className='text-2xl flex items-center gap-1 text-primary font-extrabold'>Lumino <span className='text-sm text-muted-foreground font-semibold mt-1.5'>E-commerce</span></SidebarGroupLabel>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton size="lg" className={location === item.url ? "bg-primary/10 hover:bg-primary/10 text-primary hover:text-primary" : ""} tooltip={item.title} asChild>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}