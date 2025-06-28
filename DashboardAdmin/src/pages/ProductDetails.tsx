import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Edit,
    Trash2,
    Star,
    Download,
    Eye,
    Share2,
    MessageSquare,
    Package,
} from 'lucide-react';
import { useProduct } from '@/hooks/useProduct';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export default function ProductDetail() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('overview');

    const { products, loading } = useProduct()

    const productData = products?.find((product) => product.id === id);

    if (!productData) {
        return <div>Prodcuct Not Found</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }


    const renderStars = (rating: number) => {
        if (!rating) return null; // add null check for rating
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating)
                    ? 'text-yellow-400 fill-current'
                    : i < rating
                        ? 'text-yellow-400 fill-current opacity-50'
                        : 'text-gray-300'
                    }`}
            />
        ));
    };

    return (
        <div className="space-y-6 md:p-0 p-2">
            {/* Header */}
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/">overview</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/products">products</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>{productData?.title}
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">{productData?.title}</h1>
                        <div className="flex items-center space-x-4 mt-2">
                            <Badge className={productData?.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                {productData?.status}
                            </Badge>
                            <span className="text-muted-foreground">ID: #{productData?.id}</span>
                            <span className="text-muted-foreground">Created: {productData?.createdAt}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                    </Button>
                    <Link to={`/products/edit/${id}`}>
                        <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </Button>
                    </Link>
                    <Button variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                                <p className="text-2xl font-bold text-foreground">{productData?.sales}</p>
                            </div>
                            <Package className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Rating</p>
                                <div className="flex items-center space-x-2">
                                    <p className="text-2xl font-bold text-foreground">{productData?.rating}</p>
                                    <div className="flex">
                                        {renderStars(productData?.rating || 0)}
                                    </div>
                                </div>
                            </div>
                            <Star className="h-8 w-8 text-yellow-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Reviews</p>
                                {/* <p className="text-2xl font-bold text-foreground">{productData?.reviews.length}</p> */}
                            </div>
                            <MessageSquare className="h-8 w-8 text-purple-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList className="w-full">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                            <TabsTrigger value="files">Files</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Product Description</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-foreground/80 leading-relaxed">{productData?.description}</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Features</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {productData?.features.map((feature, index) => (
                                            <li key={index} className="flex items-start space-x-2">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                                <span className="text-foreground/80">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Technologies Used</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-3">
                                        {productData?.tools.map((tool, index) => (
                                            <div key={index} className="flex items-center space-x-2 bg-background px-3 py-2 rounded-lg shadow">
                                                <img src={tool.icon} alt={tool.name} className="w-5 h-5" />
                                                <span className="font-medium text-foreground">{tool.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="reviews" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Customer Reviews</CardTitle>
                                    <CardDescription>
                                        {/* {productData.reviews.length} reviews • Average rating: {productData.rating}/5 */}
                                    </CardDescription>
                                </CardHeader>
                                {/* <CardContent className="space-y-6">
                                    {productData.reviews.map((review) => (
                                        <div key={review.user} className="border-b pb-6 last:border-b-0">
                                            <div className="flex items-start space-x-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div>
                                                            <h4 className="font-semibold text-foreground">{review.user}</h4>
                                                            <div className="flex items-center space-x-2">
                                                                <div className="flex">
                                                                    {renderStars(review.rating)}
                                                                </div>
                                                                <span className="text-sm text-muted-foreground">{review.date}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <Button variant="ghost" size="sm">
                                                            <MessageSquare className="w-4 h-4 mr-1" />
                                                            Reply
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent> */}
                            </Card>
                        </TabsContent>

                        <TabsContent value="files" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Product Files</CardTitle>
                                    <CardDescription>Downloadable files and assets</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <Package className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">portfolio-template-v1.2.zip</p>
                                                    <p className="text-sm text-muted-foreground">Main template files • 15.2 MB</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Button variant="outline" size="sm">
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Preview
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Download
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                    <Package className="w-5 h-5 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">documentation.pdf</p>
                                                    <p className="text-sm text-muted-foreground">Setup guide and documentation • 2.1 MB</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Button variant="outline" size="sm">
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    Preview
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Download
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                                    <Package className="w-5 h-5 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">design-assets.sketch</p>
                                                    <p className="text-sm text-muted-foreground">Original design files • 8.7 MB</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Button variant="outline" size="sm">
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Download
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Image</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={productData.image}
                                alt={productData.title}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Product Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Price</span>
                                <span className="font-semibold">${productData.price}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Category</span>
                                <Badge variant="secondary">{productData.category}</Badge>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Status</span>
                                <Badge className={productData.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                    {productData.status}
                                </Badge>
                            </div>
                            <Separator />
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Created</span>
                                <span className="text-sm">{productData.createdAt}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Last Updated</span>
                                <span className="text-sm">{productData.updatedAt}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button className="w-full" variant="outline">
                                <Eye className="w-4 h-4 mr-2" />
                                Preview Product
                            </Button>
                            <Button className="w-full" variant="outline">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share Product
                            </Button>
                            <Button className="w-full" variant="outline">
                                <Download className="w-4 h-4 mr-2" />
                                Download Files
                            </Button>
                            <Separator />
                            <Link to={`/products/edit/${id}`} className="w-full">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Product
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}