import { useAuth } from "@/hooks/useAuth"
import { Navigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth()

  // Redirect ke login jika belum login
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  // Dummy order history
  const orders = [
    {
      id: "ORD-001",
      date: new Date("2025-06-01"),
      item: "Modern Business Template",
      status: "Completed",
    },
    {
      id: "ORD-002",
      date: new Date("2025-06-15"),
      item: "AI Virtual Assistant",
      status: "Processing",
    },
  ]

  return (
    <section className="min-h-screen px-4 py-20 bg-gradient-to-br from-white via-indigo-50 to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Profile Card */}
        <Card className="p-6">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="w-14 h-14">
              <AvatarFallback className="bg-primary text-white text-xl font-semibold">
                {user?.name?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-bold">{user?.name}</CardTitle>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <Button className="w-full" variant="destructive" onClick={logout}>
              Logout
            </Button>
          </CardContent>
        </Card>

        {/* Order History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">🧾 Order History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {orders.length === 0 ? (
              <p className="text-muted-foreground">You have no orders yet.</p>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="flex justify-between items-center border rounded-lg p-4"
                >
                  <div>
                    <p className="font-semibold">{order.item}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(order.date, "dd MMM yyyy")} &bull; {order.id}
                    </p>
                  </div>
                  <Badge
                    variant={
                      order.status === "Completed"
                        ? "default"
                        : order.status === "Processing"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default ProfilePage