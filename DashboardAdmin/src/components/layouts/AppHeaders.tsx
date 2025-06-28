import { Button } from "@/components/ui/button"
import { Bell, Settings, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "../ui/sidebar"
import { ModeToggle } from "../fragments/mode-toggel"
import { Link } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
const AppHeaders = () => {
    const { logout, user } = useAuth()

    return (
        <nav className="w-full z-50 bg-background sticky top-2 flex items-center justify-between rounded-md border shadow px-2 py-1">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold md:hidden block text-primary">Lumino</h1>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" asChild className="relative rounded-full">
                    <Link to="/notifications">
                        <Bell className="h-5 w-5" />
                        <Badge variant="destructive" className="absolute -top-1 -right-1 rounded-full">
                            3
                        </Badge>
                    </Link>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-full">
                            <User />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link to="#" className="flex items-center">
                                <div className="w-10 h-10 border rounded-full bg-primary text-white flex items-center justify-center text-xl shadow">
                                    {user?.name?.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium">{user?.name}</span>
                                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                                </div>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link to="/settings" className="flex items-center"><Settings className="mr-2" /> Settings</Link></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => logout()}>Sign Out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <ModeToggle />
            </div>
        </nav>
    )
}

export default AppHeaders