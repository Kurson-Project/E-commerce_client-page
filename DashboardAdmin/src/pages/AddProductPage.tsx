import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Plus, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useProduct, type ProductUploadProps } from '@/hooks/useProduct';
import { supabase } from '@/lib/supabaseClient';
import tools from '@/data/tools.json';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

export default function AddProduct() {
  const [formData, setFormData] = useState<ProductUploadProps>({
    title: '',
    category: '',
    price: 0,
    description: '',
    features: [''],
    tools: [{ name: '', icon: '' }],
    rating: 0,
    image: '',
  });
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { createProduct, errorAdd } = useProduct();

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleImage({ target: { files } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setUploadedImage(selectedFile);
    }
  }

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

  const addTool = (toolName: string) => {
    const tool = tools.find((t) => t.name === toolName);
    if (!tool) return;
    setFormData((prev) => ({
      ...prev,
      tools: [...prev.tools, { name: tool.name, icon: tool.icon }],
    }));
  };

  const removeTool = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tools: prev.tools.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    if (formData.title === '') {
      toast.error('Title is required');
    } else if (formData.category === '') {
      toast.error('Category is required');
    } else if (formData.price === 0) {
      toast.error('Price is required');
    } else if (formData.description === '') {
      toast.error('Description is required');
    } else if (formData.features.length === 0) {
      toast.error('Features are required');
    } else if (formData.tools.length === 0) {
      toast.error('Tools are required');
    } else {
      const fileExt = uploadedImage?.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `uploads/${fileName}`

      const { error } = await supabase.storage.from('course').upload(filePath, uploadedImage!)

      if (error) {
        console.log(error)
        toast.error(error.message)
        return
      } else {
        const { data } = await supabase.storage
          .from('course')
          .getPublicUrl(filePath);
        const dataIn = {
          title: formData.title,
          image: data.publicUrl,
          price: formData.price,
          category: formData.category,
          description: formData.description,
          features: formData.features,
          tools: formData.tools,
          rating: formData.rating,
        }
        const sendData = await createProduct(dataIn);
        if (sendData) {
          toast.success('Product created successfully');
          setFormData({
            title: '',
            category: '',
            price: 0,
            description: '',
            features: [''],
            tools: [{ name: '', icon: '' }],
            rating: 0,
            image: '',
          });
          setUploadedImage(null);
        } else {
          toast.error(errorAdd);
        }
      }
      setUploading(false);
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
          <BreadcrumbItem>add product</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600 mt-1">Create a new template or AI agent for your store</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-0">
                <h1 className='text-xl font-bold'>Basic Information</h1>
                <p className='text-muted-foreground'>Essential details about your product</p>
              </div>
              <div>
                <Label htmlFor="title">Product Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Modern Portfolio Template"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
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
                    placeholder="29"
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
                  placeholder="Detailed description of your product..."
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div className="flex flex-col gap-0">
                <h1 className='text-xl font-bold'>Product Features</h1>
                <p className='text-muted-foreground'>List the key features of your product</p>
              </div>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="Enter a feature"
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

              <div className="flex flex-col gap-0 mt-4">
                <h1 className='text-xl font-bold'>Tools & Technologies</h1>
                <p className='text-muted-foreground'>Technologies used in this product</p>
              </div>
              {formData.tools.map((tool, index) => (
                <div key={index} className="flex w-full items-center justify-between">
                  {tool.name.length > 0 || tool.icon.length > 0 ? (
                    <>
                      <div className="flex items-center gap-2 p-2 rounded-md border">
                        <img src={tool.icon} alt={tool.name} className="w-4 h-4" />
                        <span>{tool.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeTool(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <p>No tools added</p>
                  )}
                </div>
              ))}

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Tool
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search tools..." />
                    <CommandList>
                      {tools.map((tool) => (
                        <CommandItem
                          key={tool.name}
                          value={tool.name}
                          onSelect={() => addTool(tool.name)}
                        >
                          <Check
                            className={formData.tools.some(
                              (t) => t.name === tool.name && t.icon === tool.icon
                            )
                              ? "opacity-100"
                              : "opacity-0"}
                            aria-hidden="true"
                          />
                          <img
                            src={tool.icon}
                            alt={tool.name}
                            className="w-4 h-4 mr-2"
                          />
                          {tool.name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Image</CardTitle>
              <CardDescription>Upload a preview image for your product</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {uploadedImage ? (
                  <div className="space-y-4">
                    <img
                      src={URL.createObjectURL(uploadedImage)}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setUploadedImage(null);
                        imageInputRef.current!.value = '';
                      }}
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="text-sm text-gray-600">
                      Drag and drop an image here, or click to browse
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2"
                      onClick={() => imageInputRef.current?.click()}
                    >
                      Browse Files
                    </Button>
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImage}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>


          <Card>
            <CardHeader>
              <CardTitle>Product File</CardTitle>
              <CardDescription>Upload a file for your product</CardDescription>
            </CardHeader>
            <CardContent>
              <input type="file" className='w-full border p-2 rounded-lg' onChange={(e) => setUploadedFile(e.target.files?.[0] as File)} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button type="submit" disabled={uploading} className="w-full bg-blue-600 hover:bg-blue-700">
                {uploading ? 'Uploading...' : 'Create Product'}
              </Button>
              <Button type="button" variant="outline" className="w-full">
                Save as Draft
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}