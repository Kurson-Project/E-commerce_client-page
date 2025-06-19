import { useAuth } from "@/hooks/useAuth"
import { Navigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth()

  // Jika belum login, redirect ke login
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return (
    <section className="min-h-screen px-6 py-20 bg-gradient-to-br from-white via-indigo-50 to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-xl mx-auto p-6 rounded-xl shadow-lg border bg-card">
        <h1 className="text-3xl font-bold mb-4">👤 Your Profile</h1>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>
            <p className="text-lg font-medium">{user?.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-lg font-medium">{user?.email}</p>
          </div>
        </div>

        <Button className="mt-6 w-full" variant="destructive" onClick={logout}>
          Logout
        </Button>
      </div>
    </section>
  )
}

export default ProfilePage