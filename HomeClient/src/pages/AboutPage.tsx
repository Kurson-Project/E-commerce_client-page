import { FadeIn } from "@/components/templates/animated/FadeMotion"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const AboutPage = () => {
    return (
        <div className="w-full flex flex-col items-center gap-10 p-res-xxl pt-20 bg-gradient-to-br from-background to-purple-600/10">
            <section className="w-full bg-background p-res-xxl rounded-xl border shadow-[0_0_10px_rgba(0,0,0,0.3)]">
                <FadeIn className="w-full flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold text-secondary text-center">About <span className="text-primary">LUMINO</span></h1>
                    <p className="text-muted-foreground text-center">Lumino is your gateway to high-quality digital products from website templates and mobile app UIs, to advanced AI operating systems and scalable data center configurations. Empower your next digital project with assets crafted by industry professionals. At Lumino, we believe in empowering individuals and businesses to thrive in the digital age. We are your dedicated partner for premium digital products, designed to elevate your online presence and streamline your operations.</p>
                </FadeIn>
            </section>
            <section className="w-full bg-background flex flex-col items-center justify-center p-res-xxl rounded-xl border shadow-[0_0_10px_rgba(0,0,0,0.3)]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FadeIn className="p-6 bg-blue-500/10 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-bold text-blue-700">Our Mission</h3>
                        <p className="text-muted-foreground">
                            To provide cutting-edge, high-quality digital solutions that are accessible, innovative, and directly address the evolving needs of the modern digital landscape.
                        </p>
                    </FadeIn>
                    <FadeIn className="p-6 bg-purple-500/10 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-bold text-purple-700">Our Vision</h3>
                        <p className="text-muted-foreground">
                            To be the leading marketplace for digital assets, fostering a community where creativity meets technology, and where every digital ambition can be realized.
                        </p>
                    </FadeIn>
                    <FadeIn className="p-6 bg-green-500/10 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-bold text-green-700">Our Commitment</h3>
                        <p className="text-muted-foreground">
                            We are committed to excellence, offering unparalleled support, seamless user experiences, and products that truly make a difference for our customers.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <section className="w-full bg-background flex flex-col items-center justify-center gap-6 p-res-xxl rounded-xl border shadow-[0_0_10px_rgba(0,0,0,0.3)]">
                <FadeIn className="text-3xl md:text-4xl font-bold text-secondary">What We Offer</FadeIn>
                <FadeIn className="flex flex-wrap justify-center gap-6">
                    <div className="bg-card rounded-full px-6 py-3 text-lg font-medium text-muted-foreground shadow-sm">
                        Website Templates
                    </div>
                    <div className="bg-card rounded-full px-6 py-3 text-lg font-medium text-muted-foreground shadow-sm">
                        AI System Operations
                    </div>
                </FadeIn>

                <FadeIn className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    From stunning <b>website templates</b> that empower your online presence, to <b>AI system operations</b> that automate and optimize your workflows, and robust <b>data center solutions</b> ensuring stability and security Lumino is your one-stop shop. Each product is crafted with precision, designed for performance, and backed by our passion for innovation.
                </FadeIn>

                <Button className="rounded-full" size="xl" asChild>
                    <Link to="/products">
                        Browse Products
                    </Link>
                </Button>
            </section>
        </div>
    )
}

export default AboutPage