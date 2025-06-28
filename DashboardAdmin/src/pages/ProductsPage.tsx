import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductFilters from '@/components/fragments/ProductFilters';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Star,
  Grid3X3,
  List,
  Package,
  Pencil,
  Filter
} from 'lucide-react';
import { useProduct } from '@/hooks/useProduct';
import { formatPrice } from '@/lib/format';

export default function Products() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [filters, setFilters] = useState({
    search: '',
    category: 'All Categories',
    status: 'All Status',
    priceRange: [0, 500] as [number, number],
    rating: 0,
    tools: [] as string[],
    sortBy: 'title',
    sortOrder: 'asc' as 'asc' | 'desc'
  });
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { products } = useProduct();

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'All Categories',
      status: 'All Status',
      priceRange: [0, 500],
      rating: 0,
      tools: [],
      sortBy: 'title',
      sortOrder: 'asc'
    });
  };

  // Filter and sort products
  const filteredProducts = products?.filter(product => {
      // Search filter
      if (filters.search && !product.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !product.category.toLowerCase().includes(filters.search.toLowerCase()) &&
        !product.tools.some(tool => tool.name.toLowerCase().includes(filters.search.toLowerCase()))) {
        return false;
      }

      // Category filter
      if (filters.category !== 'All Categories' && product.category !== filters.category) {
        return false;
      }

      // Status filter
      if (filters.status !== 'All Status' && product.status !== filters.status) {
        return false;
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }

      // Tools filter
      if (filters.tools.length > 0 && !filters.tools.some(tool => product.tools.some(t => t.name === tool))) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      const aValue = a[filters.sortBy as keyof typeof a];
      const bValue = b[filters.sortBy as keyof typeof b];

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  return (
    <div className="space-y-6 md:p-0 p-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage your website templates and AI agents • {filteredProducts && filteredProducts.length} of {products && products.length} products
          </p>
        </div>
        <Link to="/products/add">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Filters */}

      {/* View Toggle */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredProducts && filteredProducts.length} products
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={filtersOpen ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <Filter className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {filtersOpen && (
        <ProductFilters
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={clearFilters}
        />
      )}

      {/* Products Grid/List */}
      {filteredProducts && filteredProducts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts?.map((product) => (
            <Card key={product.id} className="p-0 gap-0 bg-background">
              <CardHeader className="p-0">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full aspect-[3/2] object-cover rounded-t-md"
                />
              </CardHeader>
              <CardContent className="p-2">
                <CardTitle className="text-base">{product.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {product.category}
                    {product.tools.map((tool, index) => (
                      <Badge variant="outline" key={index}>{tool.name}</Badge>
                    ))}
                  </div>
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t p-2">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold text-primary">{formatPrice(product.price)}</p>
                  <Badge variant="secondary">{product.status}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link to={`/products/details/${product.id}`}>
                      <Eye className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link to={`/products/edit/${product.id}`}>
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => console.log("Delete")}
                  >
                    <Trash2 className="w-4 h-4 " />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-foreground">img</th>
                    <th className="text-left p-4 font-medium text-foreground">Title</th>
                    <th className="text-left p-4 font-medium text-foreground">Category</th>
                    <th className="text-left p-4 font-medium text-foreground">Price</th>
                    <th className="text-left p-4 font-medium text-foreground">Rating</th>
                    <th className="text-left p-4 font-medium text-foreground">Sales</th>
                    <th className="text-left p-4 font-medium text-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-foreground">Tools</th>
                    <th className="text-left p-4 font-medium text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts?.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-muted">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        </div>
                      </td>
                      <td className="p-4">{product.title}</td>
                      <td className="p-4">
                        <Badge variant="secondary">{product.category}</Badge>
                      </td>
                      <td className="p-4 font-medium">{formatPrice(product.price)}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{product.rating}</span>
                        </div>
                      </td>
                      <td className="p-4">{product.sales}</td>
                      <td className="p-4">
                        <Badge
                          variant={product.status === 'Active' ? 'default' : 'outline'}
                          className={product.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {product.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {product.tools.slice(0, 2).map((tool, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tool.name}
                            </Badge>
                          ))}
                          {product.tools.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.tools.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/product/details/${product.id}`}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/product/edit/${product.id}`}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
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
      )}
    </div>
  );
}