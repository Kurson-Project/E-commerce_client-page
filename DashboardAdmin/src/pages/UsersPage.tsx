import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    UserPlus,
    Mail,
    Ban,
    CheckCircle,
    Users as UsersIcon,
    Calendar,
    User
} from 'lucide-react';
import { formatPrice } from '@/lib/format';

const users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
        role: 'customer',
        status: 'active',
        joinDate: '2024-01-15',
        totalOrders: 3,
        totalSpent: 97
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        role: 'customer',
        status: 'active',
        joinDate: '2024-01-10',
        totalOrders: 1,
        totalSpent: 149
    },
    {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100',
        role: 'customer',
        status: 'active',
        joinDate: '2024-01-08',
        totalOrders: 2,
        totalSpent: 68
    },
    {
        id: 4,
        name: 'Alice Brown',
        email: 'alice@example.com',
        avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100',
        role: 'customer',
        status: 'inactive',
        joinDate: '2024-01-05',
        totalOrders: 0,
        totalSpent: 0
    },
    {
        id: 5,
        name: 'Charlie Wilson',
        email: 'charlie@example.com',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
        role: 'admin',
        status: 'active',
        joinDate: '2023-12-20',
        totalOrders: 8,
        totalSpent: 456
    },
    {
        id: 6,
        name: 'Diana Davis',
        email: 'diana@example.com',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
        role: 'admin',
        status: 'active',
        joinDate: '2023-11-15',
        totalOrders: 0,
        totalSpent: 0
    }
];

export default function UsersPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'inactive':
                return 'bg-gray-100 text-gray-800';
            case 'banned':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin':
                return 'bg-purple-100 text-purple-800';
            case 'customer':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const activeUsers = users.filter(u => u.status === 'active').length;
    const totalRevenue = users.reduce((sum, user) => sum + user.totalSpent, 0);

    return (
        <div className="space-y-6 md:p-0 p-2">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Users</h1>
                    <p className="text-muted-foreground mt-1">Manage your customers and their accounts</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                                <p className="text-2xl font-bold">{users.length}</p>
                            </div>
                            <UsersIcon className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                                <p className="text-2xl font-bold">{activeUsers}</p>
                            </div>
                            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Admin Users</p>
                                <p className="text-2xl font-bold">
                                    {users.filter(user => user.role === 'admin').length}
                                </p>
                            </div>
                            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                                <p className="text-2xl font-bold">{formatPrice(totalRevenue)}</p>
                            </div>
                            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 font-bold text-sm">$</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex items-center space-x-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-80">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search users..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Button variant="outline">
                                <Filter className="w-4 h-4 mr-2" />
                                Filter
                            </Button>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                                <Calendar className="w-4 h-4 mr-2" />
                                Join Date
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                    <CardDescription>Manage your platform users and their accounts</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted border-b">
                                <tr>
                                    <th className="text-left p-4 font-medium">User</th>
                                    <th className="text-left p-4 font-medium">Role</th>
                                    <th className="text-left p-4 font-medium">Status</th>
                                    <th className="text-left p-4 font-medium">Join Date</th>
                                    <th className="text-left p-4 font-medium">Orders</th>
                                    <th className="text-left p-4 font-medium">Total Spent</th>
                                    <th className="text-left p-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="border-b hover:bg-muted">
                                        <td className="p-4">
                                            <div className="flex items-center space-x-3">
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    className="w-10 h-10 object-cover rounded-full"
                                                />
                                                <div>
                                                    <p className="font-medium">{user.name}</p>
                                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <Badge className={`${getRoleColor(user.role)} capitalize`}>
                                                {user.role}
                                            </Badge>
                                        </td>
                                        <td className="p-4">
                                            <Badge className={`${getStatusColor(user.status)} capitalize`}>
                                                {user.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-muted-foreground">{user.joinDate}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className="font-medium">{user.totalOrders}</span>
                                        </td>
                                        <td className="p-4">
                                            <span className="font-bold">${user.totalSpent}</span>
                                        </td>
                                        <td className="p-4">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        View Profile
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Mail className="w-4 h-4 mr-2" />
                                                        Send Email
                                                    </DropdownMenuItem>
                                                    {user.status === 'active' ? (
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Ban className="w-4 h-4 mr-2" />
                                                            Suspend User
                                                        </DropdownMenuItem>
                                                    ) : (
                                                        <DropdownMenuItem className="text-green-600">
                                                            <CheckCircle className="w-4 h-4 mr-2" />
                                                            Activate User
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}