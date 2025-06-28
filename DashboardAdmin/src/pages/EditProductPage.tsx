import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { useProduct, type Product } from '@/hooks/useProduct';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export default function EditProduct() {
    const { id } = useParams();

    const [formData, setFormData] = useState<Product>({
        id: '',
        title: '',
        description: '',
        price: 0,
        category: '',
        image: '',
        features: [],
        tools: [],
        rating: 0,
        sales: 0,
        status: 'Active',
        reviews: [],
        createdAt: '',
        updatedAt: '',
        revenue: 0
    });

    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const { products } = useProduct();

    useEffect(() => {
        const product = products?.find((product) => product.id.toString() === id);
        if (product) {
            setFormData(product as Product);
            setUploadedImage(product.image);
        }
    }, [id, products]);

    const addFeature = () => {
        setFormData(prev => ({
            ...prev,
            features: [...prev.features, '']
        }));
    };

    const removeFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const updateFeature = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.map((feature, i) => i === index ? value : feature)
        }));
    };

    const addTool = () => {
        setFormData(prev => ({
            ...prev,
            tools: [...prev.tools, { name: '', icon: '' }]
        }));
    };

    const removeTool = (index: number) => {
        setFormData(prev => ({
            ...prev,
            tools: prev.tools.filter((_, i) => i !== index)
        }));
    };

    const updateTool = (index: number, field: 'name' | 'icon', value: string) => {
        setFormData(prev => ({
            ...prev,
            tools: prev.tools.map((tool, i) =>
                i === index ? { ...tool, [field]: value } : tool
            )
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Product updated successfully!');
    };

    const handleFile = (file: File) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
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
                    <BreadcrumbItem>edit product</BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center space-x-4">
                <div>
                    <h1 className="text-3xl font-bold">Edit Product</h1>
                    <p className="text-muted-foreground mt-1">Update your product information</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>Essential details about your product</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="title">Product Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    className="mt-1"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="category">Category</Label>
                                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Website Templates">Website Templates</SelectItem>
                                            <SelectItem value="AI Agents">AI Agents</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="price">Price</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    rows={4}
                                    className="mt-1"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Product Features</CardTitle>
                            <CardDescription>List the key features of your product</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {formData.features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <Input
                                        value={feature}
                                        onChange={(e) => updateFeature(index, e.target.value)}
                                        className="flex-1"
                                    />
                                    {formData.features.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeFeature(index)}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={addFeature}>
                                Add Feature
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tools & Technologies</CardTitle>
                            <CardDescription>Technologies used in this product</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {formData.tools.map((tool, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <Input
                                        value={tool.name}
                                        onChange={(e) => updateTool(index, 'name', e.target.value)}
                                        placeholder="Tool name"
                                        className="flex-1"
                                    />
                                    <Input
                                        value={tool.icon}
                                        onChange={(e) => updateTool(index, 'icon', e.target.value)}
                                        placeholder="Icon URL (optional)"
                                        className="flex-1"
                                    />
                                    {formData.tools.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeTool(index)}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={addTool}>
                                Add Tool
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Image</CardTitle>
                            <CardDescription>Current product image</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {uploadedImage && (
                                    <img
                                        src={uploadedImage}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                )}
                                <div className="flex space-x-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        id="image-upload"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) handleFile(file);
                                        }}
                                    />
                                    <label htmlFor="image-upload" className="flex-1">
                                        <Button type="button" variant="outline" className="w-full">
                                            <Upload className="w-4 h-4 mr-2" />
                                            Change Image
                                        </Button>
                                    </label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setUploadedImage(null)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                Update Product
                            </Button>
                            <Button type="button" variant="outline" className="w-full">
                                Save as Draft
                            </Button>
                            <Button type="button" variant="destructive" className="w-full">
                                Delete Product
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </div>
    );
}