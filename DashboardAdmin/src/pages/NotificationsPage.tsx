import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Bell,
    CheckCircle,
    AlertTriangle,
    Info,
    Package,
    ShoppingCart,
    User,
    Settings,
    Trash2,
    MoreHorizontal
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const notifications = [
    {
        id: "1",
        type: 'order',
        title: 'New Order Received',
        message: 'John Doe purchased "Modern Portfolio Template" for $29.00',
        time: '2 minutes ago',
        read: false,
        icon: ShoppingCart,
    },
    {
        id: "2",
        type: 'product',
        email: 'n2E5w@example.co',
        title: 'Product Review Added',
        message: 'New 5-star review for "E-commerce AI Agent" by Jane Smith',
        time: '15 minutes ago',
        read: false,
        icon: Package,
    },
    {
        id: "3",
        type: 'user',
        email: 'n2E5w@example.com',
        title: 'New User Registration',
        message: 'Alice Brown has created a new account',
        time: '1 hour ago',
        read: true,
        icon: User,
    },
    {
        id: "4",
        type: 'system',
        title: 'System Backup Completed',
        message: 'Daily backup completed successfully at 3:00 AM',
        time: '6 hours ago',
        read: true,
        icon: CheckCircle,
    },
    {
        id: "5",
        type: 'warning',
        title: 'High Server Load Detected',
        message: 'Server CPU usage exceeded 85% for 5 minutes',
        time: '8 hours ago',
        read: false,
        icon: AlertTriangle,
    },
    {
        id: "6",
        type: 'order',
        title: 'Order Refund Requested',
        message: 'Charlie Wilson requested refund for order #ORD-005',
        time: '12 hours ago',
        read: true,
        icon: ShoppingCart,
    },
    {
        id: "7",
        type: 'system',
        title: 'System Update Available',
        message: 'Version 2.1.5 is now available for installation',
        time: '1 day ago',
        read: true,
        icon: Settings,
    },
    {
        id: "8",
        type: 'product',
        title: 'Product Stock Low',
        message: 'Landing Page Kit has only 3 licenses remaining',
        time: '2 days ago',
        read: true,
        icon: Package,
    }
];

export default function Notifications() {
    const [notificationList, setNotificationList] = useState(notifications);
    const [filter, setFilter] = useState<string>('all');

    const unreadCount = notificationList.filter(n => !n.read).length;

    const markAsRead = (id: string) => {
        setNotificationList(prev => prev.map(notification =>
            notification.id === id ? { ...notification, read: true } : notification
        ));
    };

    const markAllAsRead = () => {
        setNotificationList(prev => prev.map(notification => ({ ...notification, read: true })));
    };

    const deleteNotification = (id: string) => {
        setNotificationList(prev => prev.filter(notification => notification.id !== id));
    };

    const filteredNotifications = filter === 'all'
        ? notificationList
        : notificationList.filter(n => n.type === filter);

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'order':
                return 'bg-green-100 text-green-800';
            case 'product':
                return 'bg-blue-100 text-blue-800';
            case 'user':
                return 'bg-purple-100 text-purple-800';
            case 'system':
                return 'bg-gray-100 text-gray-800';
            case 'warning':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6 md:p-0 p-2">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
                    <p className="text-muted-foreground mt-1">
                        Stay updated with important platform activities
                        {unreadCount > 0 && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                {unreadCount} unread
                            </span>
                        )}
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark All Read
                    </Button>
                    <Button variant="outline">
                        <Bell className="w-4 h-4 mr-2" />
                        Settings
                    </Button>
                </div>
            </div>

            {/* Filter Tabs */}
            <Card>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { key: 'all', label: 'All', count: notificationList.length },
                            { key: 'order', label: 'Orders', count: notificationList.filter(n => n.type === 'order').length },
                            { key: 'product', label: 'Products', count: notificationList.filter(n => n.type === 'product').length },
                            { key: 'user', label: 'Users', count: notificationList.filter(n => n.type === 'user').length },
                            { key: 'system', label: 'System', count: notificationList.filter(n => n.type === 'system').length },
                            { key: 'warning', label: 'Warnings', count: notificationList.filter(n => n.type === 'warning').length }
                        ].map((tab) => (
                            <Button
                                key={tab.key}
                                variant={filter === tab.key ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilter(tab.key)}
                                className="flex items-center space-x-2"
                            >
                                <span>{tab.label}</span>
                                {tab.count > 0 && (
                                    <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                                        {tab.count}
                                    </Badge>
                                )}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Notifications List */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest notifications and system alerts</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-gray-200">
                        {filteredNotifications.length === 0 ? (
                            <div className="p-8 text-center">
                                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-muted-foreground">No notifications found</p>
                            </div>
                        ) : (
                            filteredNotifications.map((notification) => {
                                const IconComponent = notification.icon;
                                return (
                                    <div
                                        key={notification.id}
                                        className={`p-6 hover:bg-muted transition-colors ${!notification.read ? 'bg-muted' : ''
                                            }`}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                                                <IconComponent className={`w-5 h-5 ${getTypeColor(notification.type)}`} />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <h3 className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'
                                                                }`}>
                                                                {notification.title}
                                                            </h3>
                                                            {!notification.read && (
                                                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-muted-foreground mb-2">
                                                            {notification.message}
                                                        </p>
                                                        <div className="flex items-center space-x-3">
                                                            <span className="text-xs text-gray-500">
                                                                {notification.time}
                                                            </span>
                                                            <Badge className={getTypeColor(notification.type)}>
                                                                {notification.type}
                                                            </Badge>
                                                        </div>
                                                    </div>

                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm">
                                                                <MoreHorizontal className="w-4 h-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            {!notification.read && (
                                                                <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                                    Mark as Read
                                                                </DropdownMenuItem>
                                                            )}
                                                            <DropdownMenuItem>
                                                                <Info className="w-4 h-4 mr-2" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="text-red-600"
                                                                onClick={() => deleteNotification(notification.id)}
                                                            >
                                                                <Trash2 className="w-4 h-4 mr-2" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}