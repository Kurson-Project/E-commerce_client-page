import CardProduk from "@/components/templates/card/CardProduk"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ArrowRight, UserPlus, Search, CreditCard, Settings, Download } from "lucide-react"
import { Link } from "react-router-dom"
import { FadeIn } from "@/components/templates/animated/FadeMotion"
import ProductJson from "@/data/product.json"
import ProductCategoryJson from "@/data/productCategory.json"
import faqData from "@/data/faqData.json"
import { AccordionContent, AccordionItem, AccordionTrigger, Accordion } from "@/components/ui/accordion"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


const steps = [
  {
    icon: <UserPlus className="w-7 h-7" />,
    title: "Create a Free Account",
    desc: "Sign up instantly and access all digital products and AI features.",
  },
  {
    icon: <Search className="w-7 h-7" />,
    title: "Explore & Choose Products",
    desc: "Browse by category, price, popularity, and AI compatibility.",
  },
  {
    icon: <CreditCard className="w-7 h-7" />,
    title: "One-Time Payment, Lifetime Access",
    desc: "Pay securely and get full access with official licenses.",
  },
  {
    icon: <Settings className="w-7 h-7" />,
    title: "Customize Platform Details",
    desc: "Enter your website or AI agent name, branding, and preferences before checkout.",
  },
  {
    icon: <Download className="w-7 h-7" />,
    title: "Use & Get Support",
    desc: "Enjoy instant downloads, lifetime updates, and expert assistance.",
  },
];


const HomePage = () => {
  const BestProduk = ProductJson.filter((item) => item.rating > 4.7).slice(0, 6);
  const FaqData = faqData.slice(0, 3);
  return (
    <>
      <section className="relative overflow-hidden h-screen flex items-center justify-center p-res-xxl bg-gradient-to-br from-secondary/40 via-background to-primary/40 shadow-lg shadow-secondary/20">
        <FadeIn direction="up" className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border border-secondary/50 bg-secondary/10 text-secondary">
            <span>🚀 Trusted by 10,000+ creators</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight leading-tight">
            Empower Your Digital <br className="hidden md:block" />
            <span className="text-primary text-5xl">Product Business with Lumino</span>
          </h1>
          <p className="mt-2 text-lg md:text-xl text-muted-foreground max-w-2xl">
            Lumino is an all-in-one platform to order, customize, and launch digital products like website templates and AI agents.
            Easily personalize your site name, branding, and behavior no coding required.
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <Button size={"lg"} className="rounded-full" asChild>
              <Link to="/products" >Browse Products</Link>
            </Button>
            <Button variant="outline" className="rounded-full" size={"lg"} asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </FadeIn>
      </section>

      <section className="w-full flex flex-col items-center justify-center px-res-xxl pt-20">
        <FadeIn className="w-full">
          <h1 className="text-2xl font-bold text-secondary">Browse by Category</h1>
          <p className="text-muted-foreground">Discover a wide range of products across various categories, from website templates to mobile app UIs and advanced AI operating systems.</p>
        </FadeIn>
        <hr className="w-full my-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {ProductCategoryJson.map((item, index) =>
            <FadeIn key={index} direction="down" delay={index * 0.1} className="w-full h-full">
              <Card key={index} className="w-full h-full">
                <CardHeader className="h-full">
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild>
                    <Link to={item.path}>
                      Browse {item.name} <ArrowRight />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>
          )}
        </div>
      </section>

      <section className="w-full flex flex-col justify-center shadow-lg shadow-secondary/20 py-20 overflow-hidden">
        <FadeIn className="w-full flex items-center justify-between px-res-xxl">
          <h1 className="text-2xl font-bold text-secondary">Best Products</h1>
          <Button variant="link" asChild>
            <Link to="/products">
              Browse All Products <ArrowRight />
            </Link>
          </Button>
        </FadeIn>
        <hr className="mt-4 mx-res-xxl" />
        <div className="px-res-xxl">
          <Carousel>
            <CarouselContent className="py-6 px-1">
              {BestProduk.map((item, index) => (
                <CarouselItem key={index} className="w-full h-full lg:basis-1/3 sm:basis-1/2">
                  <FadeIn className="w-full h-full">
                    <CardProduk
                      title={item.title}
                      image={item.image}
                      price={item.price}
                      tools={item.tools}
                      rating={item.rating}
                    />
                  </FadeIn>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="-translate-x-8" />
            <CarouselPrevious className="translate-x-8" />
          </Carousel>
        </div>
      </section>

      <section className="pt-20 px-res-xxl">
        <div className="w-full">
          <FadeIn>
            <h1 className="text-2xl font-bold text-secondary">
              How Lumino Works
            </h1>
            <p className="text-muted-foreground">
              Just four simple steps to build and deploy your digital solution fast and securely.
            </p>
          </FadeIn>
          <hr className="my-4" />
          <div className="grid md:grid-cols-5 gap-4">
            {steps.map((step, idx) => (
              <FadeIn delay={idx * 0.1} direction="center" key={idx} className="flex flex-col items-center text-center">
                <div className="text-primary mb-4">{step.icon}</div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col justify-center p-res-xxl">
        <FadeIn>
          <h1 className="text-2xl font-bold text-secondary">Answering Your Questions</h1>
        </FadeIn>
        <hr className="my-4" />
        <Accordion type="multiple">
          {FaqData.map((faq, index) => (
            <FadeIn key={index} delay={index * 0.2} direction="left">
              <AccordionItem value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            </FadeIn>
          ))}
        </Accordion>
      </section>
    </ >
  )
}

export default HomePage