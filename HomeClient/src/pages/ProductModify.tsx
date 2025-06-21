import { useParams } from "react-router-dom"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import DataProduct from "@/data/product.json"

const ProductModify = () => {
  const { id } = useParams()
  const product = DataProduct.find((item) => item.title === id)

  const [form, setForm] = useState({
    projectName: "",
    customRequest: "",
    usageDesc: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("User Custom Request Submitted:", {
      product: id,
      ...form
    })
    alert("Your request has been submitted!")
  }

  if (!product) return <p className="p-10 text-center">Product not found</p>

  return (
    <section className="px-6 py-12 max-w-3xl pt-20 mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛠 Customize Your {product.title}</h1>
      <p className="text-muted-foreground mb-6">
        Submit a request to modify this product based on your needs. Our team will review and follow up.
      </p>

      <div className="mb-8">
        <img src={product.image} alt={product.title} className="rounded-lg shadow" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="font-medium mb-1 block">Project Name</label>
          <Input
            name="projectName"
            value={form.projectName}
            onChange={handleChange}
            required
            placeholder="e.g., My Startup Landing Page"
          />
        </div>

        <div>
          <label className="font-medium mb-1 block">Describe How You'll Use It</label>
          <Textarea
            name="usageDesc"
            rows={3}
            value={form.usageDesc}
            onChange={handleChange}
            placeholder="Describe your use case or goals..."
          />
        </div>

        <div>
          <label className="font-medium mb-1 block">Customization Request</label>
          <Textarea
            name="customRequest"
            rows={5}
            value={form.customRequest}
            onChange={handleChange}
            placeholder="Tell us what you want to change or add (e.g. change color, add section, integrate payment, etc.)"
          />
        </div>

        <Button type="submit" className="w-full mt-4">
          Submit Customization Request
        </Button>
      </form>
    </section>
  )
}

export default ProductModify