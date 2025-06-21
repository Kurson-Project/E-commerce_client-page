import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import DataProduct from "@/data/product.json"
import { useAuth } from "@/hooks/useAuth"

export default function ProductOrderPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("bank")

  const { isAuthenticated } = useAuth()

  const product = DataProduct.find((item) => item.title === id)

  useEffect(() => {
    if (!product) navigate("/products")
  }, [product, navigate])

  if (!product) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const paymentDetails = {
    bank: (
      <div className="space-y-2">
        <p>Transfer to the following account:</p>
        <div className="bg-muted p-4 rounded">
          <p><strong>Bank:</strong> BCA</p>
          <p><strong>Account Number:</strong> 1234567890</p>
          <p><strong>Account Name:</strong> PT Lumino Digital</p>
        </div>
      </div>
    ),
    ewallet: (
      <div className="space-y-2">
        <p>Scan the QR code below with your e-wallet app:</p>
        <img src="/qrcode-example.png" alt="QR Code" className="w-40 h-40" />
        <p className="text-sm text-muted-foreground">Supports OVO, GoPay, and DANA</p>
      </div>
    ),
    card: (
      <div className="space-y-2">
        <p>Proceed to secure payment gateway for card processing.</p>
        <Button disabled className="opacity-60">Redirecting to Stripe...</Button>
      </div>
    ),
  }

  if (!isAuthenticated) return <Navigate to="/login" />

  return (
    <section className="min-h-screen bg-background text-foreground py-20 px-6">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold">🛒 Complete Your Order</h2>
          <p className="text-muted-foreground mt-2">
            {submitted ? "Please follow the instructions to complete your payment." :
              "Review product details and fill your information to continue."}
          </p>
        </div>

        {/* Produk */}
        <div className="flex gap-4 items-center p-4 border rounded-xl bg-muted/30 shadow">
          <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded" />
          <div>
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-primary font-medium">${product.price}</p>
          </div>
        </div>

        {!submitted ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Platform Name */}
            <div className="space-y-2">
              <Label htmlFor="platform">Platform Name</Label>
              <Input id="platform" required placeholder="Your platform name" />
            </div>
            
            {/* Catatan */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (optional)</Label>
              <Textarea id="notes" placeholder="Write any special requests here..." />
            </div>

            {/* Metode Pembayaran */}
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank">Bank Transfer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ewallet" id="ewallet" />
                  <Label htmlFor="ewallet">E-Wallet (OVO, GoPay, DANA)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Credit / Debit Card</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full">Submit Order</Button>
          </form>
        ) : (
          <div className="p-6 bg-muted rounded-xl shadow space-y-4">
            <h3 className="text-xl font-semibold">💳 Payment Instructions</h3>
            {paymentDetails[paymentMethod as keyof typeof paymentDetails]}
            <p className="text-sm text-muted-foreground pt-2">
              After completing the payment, a confirmation email will be sent.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}