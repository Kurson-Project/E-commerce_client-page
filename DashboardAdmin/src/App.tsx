import { Routes, Route, Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import { AppSidebar } from "./components/layouts/AppSidebar"
import { ModeToggle } from "./components/fragments/mode-toggel"
import DashboadHome from "./pages/DashboadHome"

const MainLayout = () => {
  return (
    <SidebarProvider className="bg-secondary/5">
      <AppSidebar />
      <main className="w-full relative p-2 pl-0 space-y-2">
        <nav className="w-full bg-background sticky top-2 flex items-center justify-between rounded-md border shadow px-2 py-1">
          <SidebarTrigger />
          <ModeToggle />
        </nav>
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<DashboadHome />} />
      </Route>
    </Routes>
  )
}

export default App