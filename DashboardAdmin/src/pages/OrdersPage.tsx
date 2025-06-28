import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import OrderFilters from '@/components/fragments/OrderFilters';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  MoreHorizontal,
  Eye,
  Download,
  User,
  Package
} from 'lucide-react';
import { formatPrice } from '@/lib/format';

const orders = [
  {
    id: '#ORD-001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    product: 'Modern Portfolio Template',
    amount: 29,
    status: 'completed',
    date: '2024-01-15',
    paymentMethod: 'Credit Card'
  },
  {
    id: '#ORD-002',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    product: 'E-commerce AI Agent',
    amount: 149,
    status: 'processing',
    date: '2024-01-14',
    paymentMethod: 'PayPal'
  },
  {
    id: '#ORD-003',
    customer: {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    product: 'Blog Template Pro',
    amount: 39,
    status: 'completed',
    date: '2024-01-13',
    paymentMethod: 'Credit Card'
  },
  {
    id: '#ORD-004',
    customer: {
      name: 'Alice Brown',
      email: 'alice@example.com',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    product: 'Landing Page Kit',
    amount: 19,
    status: 'pending',
    date: '2024-01-12',
    paymentMethod: 'Credit Card'
  },
  {
    id: '#ORD-005',
    customer: {
      name: 'Charlie Wilson',
      email: 'charlie@example.com',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    product: 'Modern Portfolio Template',
    amount: 29,
    status: 'refunded',
    date: '2024-01-11',
    paymentMethod: 'PayPal'
  },
  {
    id: '#ORD-006',
    customer: {
      name: 'Eva Martinez',
      email: 'eva@example.com',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    product: 'Chat Bot AI Assistant',
    amount: 99,
    status: 'completed',
    date: '2024-01-10',
    paymentMethod: 'Credit Card'
  }
];

interface OrderFilterState {
  search: string;
  status: string;
  paymentMethod: string;
  amountRange: [number, number];
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export default function Orders() {
  const [filters, setFilters] = useState<OrderFilterState>({
    search: '',
    status: 'All Status',
    paymentMethod: 'All Methods',
    amountRange: [0, 1000] as [number, number],
    dateRange: {
      from: undefined,
      to: undefined
    },
    sortBy: 'date',
    sortOrder: 'desc' as 'asc' | 'desc',
  });

  const clearFilters = () => {
    setFilters({
      search: '',
      status: 'All Status',
      paymentMethod: 'All Methods',
      amountRange: [0, 1000],
      dateRange: {
        from: undefined,
        to: undefined
      },
      sortBy: 'date',
      sortOrder: 'desc'
    });
  };

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => {
      // Search filter
      if (filters.search &&
        !order.id.toLowerCase().includes(filters.search.toLowerCase()) &&
        !order.customer.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !order.product.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Status filter
      if (filters.status !== 'All Status' && order.status !== filters.status.toLowerCase()) {
        return false;
      }

      // Payment method filter
      if (filters.paymentMethod !== 'All Methods' && order.paymentMethod !== filters.paymentMethod) {
        return false;
      }

      // Amount range filter
      if (order.amount < filters.amountRange[0] || order.amount > filters.amountRange[1]) {
        return false;
      }

      // Date range filter (simplified for demo)
      // In real implementation, you'd parse the dates and compare properly

      return true;
    })
    .sort((a, b) => {
      let aValue, bValue;

      switch (filters.sortBy) {
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'customer':
          aValue = a.customer.name;
          bValue = b.customer.name;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = a.date;
          bValue = b.date;
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRevenue = filteredOrders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + order.amount, 0);

  return (
    <div className="space-y-6 md:p-0 p-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-1">
            Manage customer orders and transactions • {filteredOrders.length} of {orders.length} orders
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Orders
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-foreground">{filteredOrders.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">
                  {filteredOrders.filter(o => o.status === 'completed').length}
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Processing</p>
                <p className="text-2xl font-bold text-foreground">
                  {filteredOrders.filter(o => o.status === 'processing').length}
                </p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold text-foreground">{formatPrice(totalRevenue)}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">$</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <OrderFilters
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={clearFilters}
      />

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>
            A list of all customer orders • Showing {filteredOrders.length} orders
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No orders found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-foreground">Order ID</th>
                    <th className="text-left p-4 font-medium text-foreground">Customer</th>
                    <th className="text-left p-4 font-medium text-foreground">Product</th>
                    <th className="text-left p-4 font-medium text-foreground">Amount</th>
                    <th className="text-left p-4 font-medium text-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-foreground">Date</th>
                    <th className="text-left p-4 font-medium text-foreground">Payment</th>
                    <th className="text-left p-4 font-medium text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-muted">
                      <td className="p-4">
                        <span className="font-medium text-blue-600">{order.id}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={order.customer.avatar}
                            alt={order.customer.name}
                            className="w-10 h-10 object-cover rounded-full"
                          />
                          <div>
                            <p className="font-medium text-foreground">{order.customer.name}</p>
                            <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-foreground">{order.product}</p>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-foreground">{formatPrice(order.amount)}</span>
                      </td>
                      <td className="p-4">
                        <Badge className={`${getStatusColor(order.status)} capitalize`}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className="text-muted-foreground">{order.date}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-muted-foreground">{order.paymentMethod}</span>
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
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <User className="w-4 h-4 mr-2" />
                              Contact Customer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}