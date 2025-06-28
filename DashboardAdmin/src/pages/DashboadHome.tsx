import { ChartAreaGradient } from "@/components/templates/ChartTemplate"
import { ArrowUpRight, Calendar, DollarSign, Eye, Package, ShoppingCart, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/format"

const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', product: 'Modern Portfolio Template', amount: 29, status: 'completed' },
    { id: '#ORD-002', customer: 'Jane Smith', product: 'E-commerce AI Agent', amount: 149, status: 'processing' },
    { id: '#ORD-003', customer: 'Bob Johnson', product: 'Blog Template Pro', amount: 39, status: 'completed' },
];

const AdminDashboard = () => {
    return (
        <div className="w-full space-y-6 px-2 md:px-0 py-4">
            {/* Header */}
            <section className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your store.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Last 30 days
                </Button>
            </section>

            {/* Stats Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatPrice(5000)}</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="w-5 h-5 mr-1" />
                            +12.5% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Products</CardTitle>
                        <Package className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">48</div>
                        <p className="text-xs text-blue-600 flex items-center mt-1">
                            <ArrowUpRight className="w-5 h-5 mr-1" />
                            +3 new this week
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">342</div>
                        <p className="text-xs text-purple-600 flex items-center mt-1">
                            <TrendingUp className="w-5 h-5 mr-1" />
                            +8.2% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
                        <Users className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-orange-600 flex items-center mt-1">
                            <TrendingUp className="w-5 h-5 mr-1" />
                            +15.3% from last month
                        </p>
                    </CardContent>
                </Card>
            </section>


            {/* Chart & Orders */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Chart */}
                <ChartAreaGradient />

                {/* Recent Orders */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Recent Orders</CardTitle>
                            <CardDescription>Latest customer orders and their status</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <Link to="/orders" className="flex items-center">
                                <Eye className="w-4 h-4 mr-2" />
                                View All
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div>
                                            <p className="font-medium">{order.id}</p>
                                            <p className="text-sm text-muted-foreground">{order.customer}</p>
                                        </div>
                                        <div className="hidden md:block">
                                            <p className="text-sm">{order.product}</p>
                                            <span className="font-medium">{formatPrice(order.amount)}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <Badge
                                            variant={
                                                order.status === 'completed' ? 'default' :
                                                    order.status === 'processing' ? 'secondary' : 'outline'
                                            }
                                            className={
                                                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                            }
                                        >
                                            {order.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}

export default AdminDashboard