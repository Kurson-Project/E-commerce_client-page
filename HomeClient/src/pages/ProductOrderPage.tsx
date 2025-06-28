import { useParams } from 'react-router-dom'
import { useState } from 'react'
import {
    Tabs, TabsContent, TabsList, TabsTrigger
} from '@/components/ui/tabs'
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import useProduct from '@/hooks/useProduct'
import Loading from '@/components/layouts/Loading'

const ProductOrderPage = () => {
    const { id } = useParams()
    const [tabValue, setTabValue] = useState('form')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { products, loading } = useProduct()
    const product = products.find((item) => item.title === id)
    const handleOrderSubmit = () => {
        // Kirim data ke backend di sini jika perlu
        setIsSubmitted(true)
        setTabValue('success')
    }

    if (loading) return <Loading />
    if (!product) return <div>Product not found</div>

    return (
        <div className='min-h-screen w-full flex flex-col items-center p-res-xxl py-20'>
            <h1 className='text-2xl font-bold text-green-600'>Payment successful</h1>
            <div className="flex items-center gap-4 max-w-md w-full p-2 rounded-lg border shadow-md my-2">
                <img src={product?.image} alt="" className="aspect-[3/2] rounded-lg object-cover w-20" />
                <div className="flex flex-col w-full">
                    <h2 className='text-lg font-semibold'>{product?.title}</h2>
                    <div className="flex items-center gap-2">
                        <Badge>{product?.category}</Badge>
                        <span className='text-xl text-primary'>${product?.price}</span>
                    </div>
                </div>
            </div>
            <p>Please fill in the last step to complete the order.</p>

            {product?.category === 'Website Templates' && (
                <Tabs
                    value={tabValue}
                    onValueChange={(val) => {
                        if (!isSubmitted) setTabValue(val)
                    }}
                    className="w-full max-w-md mt-4"
                >
                    <TabsList className="w-full">
                        <TabsTrigger value="form" disabled={isSubmitted}>
                            Fill out the form
                        </TabsTrigger>
                        <TabsTrigger value="design" disabled={isSubmitted}>
                            Design yourself in Figma
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="form">
                        <Card className="bg-background">
                            <CardHeader>
                                <CardTitle>Website</CardTitle>
                                <CardDescription>Customize your website</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="website-name">Website Name</Label>
                                    <Input id="website-name" placeholder="e.g. Lumino Store" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="website-description">Description</Label>
                                    <Textarea id="website-description" placeholder="A modern e-commerce website with AI integration." />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={handleOrderSubmit}>
                                    Send Order
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="design">
                        <Card className="bg-background">
                            <CardHeader>
                                <CardTitle>Customize</CardTitle>
                                <CardDescription>Customize your website in Figma</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <Button className="w-full">Design in Figma</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="success">
                        <Card className="bg-green-100 border border-green-300">
                            <CardHeader>
                                <CardTitle className="text-green-700">Order Sent!</CardTitle>
                                <CardDescription className="text-green-600">
                                    Thank you! Your order has been successfully submitted. Our team will contact you soon.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </TabsContent>
                </Tabs>
            )}
            {product?.category === 'AI Agents' && (
                <div className="w-full max-w-md mt-4">
                    {isSubmitted ? (
                        <Card className="bg-green-100 border border-green-300">
                            <CardHeader>
                                <CardTitle className="text-green-700">Order Sent!</CardTitle>
                                <CardDescription className="text-green-600">
                                    Thank you! Your order has been successfully submitted. Our team will contact you soon.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ) : (
                        <Card className="bg-background">
                            <CardHeader>
                                <CardTitle>AI Agent</CardTitle>
                                <CardDescription>Customize your AI agent</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="agent-name">Agent Name</Label>
                                    <Input id="agent-name" placeholder="e.g. Lumino Agent" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="agent-description">Description</Label>
                                    <Textarea id="agent-description" placeholder="A modern e-commerce website with AI integration." />
                                </div>
                                <Button className="w-full" onClick={handleOrderSubmit}>Send Order</Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProductOrderPage