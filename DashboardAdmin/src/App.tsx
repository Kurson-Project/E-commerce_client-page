import { Routes, Route, Outlet } from "react-router-dom"
import { SidebarProvider } from "./components/ui/sidebar"
import { AppSidebar } from "./components/layouts/AppSidebar"
import DashboadHome from "./pages/DashboadHome"
import OrdersPage from "./pages/OrdersPage"
import AddProductPage from "./pages/AddProductPage"
import ProductsPage from "./pages/ProductsPage"
import { Toaster } from "./components/ui/sonner"
import NotificationsPage from "./pages/NotificationsPage"
import SettingsPage from "./pages/SettingsPage"
import EditProduct from "./pages/EditProductPage"
import UsersPage from "./pages/UsersPage"
import ProductDetail from "./pages/ProductDetails"
import AppHeaders from "./components/layouts/AppHeaders"

const MainLayout = () => {
  return (
    <SidebarProvider className="bg-gradient-to-br from-blue-600/5 to-purple-600/5 dark:from-blue-600/10 dark:to-purple-600/10">
      <AppSidebar />
      <main className="w-full relative p-2 md:pl-0 space-y-2 pt-0">
        <Toaster richColors position="top-right" />
        <AppHeaders />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboadHome />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrdersPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/details/:id" element={<ProductDetail />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
        <Route path="/products/add" element={<AddProductPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/notifications/:id" element={<NotificationsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        <Route path="*" element={<h1>404</h1>} />
      </Route>
    </Routes>
  )
}

export default App