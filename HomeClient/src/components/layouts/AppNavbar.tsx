import { Link, useLocation } from "react-router-dom"
import { Button } from "../ui/button"
import { ModeToggle } from "../fragments/mode-toggel"
import { useEffect, useState, useRef } from "react"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { AlignLeft, ShoppingCart } from "lucide-react"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu"
import { useCart, type CartItem } from "@/hooks/useCartProduct"
import { useAuth } from "@/hooks/useAuth"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

const pathRoutes = [
  {
    name: "Products", path: "#", more: [
      { name: "All Products", path: "/products" },
      { name: "Website Templates", path: "/products/website-templates" },
      { name: "AI Agents", path: "/products/ai-agents" },
      { name: "Customize", path: "/products/customize" },
    ]
  },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  {
    name: "More", path: "#", more: [
      { name: "FAQ", path: "/faq" },
      { name: "Privacy", path: "/privacy" },
      { name: "Terms", path: "/terms" },
    ]
  }
]

const AppNavbar = () => {
  const [showNavbar, setShowNavbar] = useState(true)
  const lastScrollY = useRef(0)
  const currentPath = useLocation().pathname

  const { user, isAuthenticated } = useAuth()

  const { cart } = useCart()
  const totalItems = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY

      setShowNavbar(currentScroll < lastScrollY.current || currentScroll < 10)
      lastScrollY.current = currentScroll
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed border top-2 left-2 right-2 z-50 rounded-lg flex items-center justify-between px-res-xl py-1 transition-all duration-300
       backdrop-blur-lg bg-background/20 shadow-sm
        ${showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      `}
    >
      <nav className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Link to="/" className="text-2xl text-shadow-2xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Lumino</Link>
        </div>
        <NavigationMenu viewport={false} className="hidden md:flex">
          <NavigationMenuList>
            {pathRoutes.map((route) => (
              pathRoutes.find((r) => r.path === route.path)?.more ? (
                <NavigationMenuItem key={route.name}>
                  <NavigationMenuTrigger>
                    <Link to={route.path}>{route.name}</Link>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {route.more?.map((subRoute) => (
                      <ul key={subRoute.name} className="w-[200px]">
                        <NavigationMenuItem>
                          <NavigationMenuLink asChild>
                            <Link to={subRoute.path}>{subRoute.name}</Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      </ul>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={route.name}>
                  <NavigationMenuLink asChild>
                    <Link to={route.path}>{route.name}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      <div className="flex items-center justify-end gap-2">
        {isAuthenticated ? (
          <>
            <Button variant="outline" size="icon" className="rounded-full" asChild>
              <Link to="/products/cart">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button size="icon" className="rounded-full" asChild >
                  <Link to="/profile">
                    {user?.name?.slice(0, 1).toUpperCase()}
                  </Link>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-semibold">{user?.name}</h4>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                  <Button asChild><Link to="/profile">Profile</Link></Button>
                </div>
              </HoverCardContent>
            </HoverCard>
          </>
        ) : (
          <>
            <Button variant={"outline"} asChild><Link to="/login">Sign in</Link></Button>
            <Button asChild><Link to="/register">Sign up</Link></Button>
          </>
        )}

        <ModeToggle />

        <Sheet>
          <SheetTrigger className="md:hidden">
            <AlignLeft />
          </SheetTrigger>
          <SheetContent className="md:hidden overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-2xl text-shadow-2xs font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                LUMINO
              </SheetTitle>
              <SheetDescription>Link Menu</SheetDescription>
            </SheetHeader>
            <ul className="flex flex-col gap-2 px-4">
              {pathRoutes.map((route) => (
                pathRoutes.find((r) => r.path === route.path)?.more ? (
                  <Accordion type="single" collapsible className="w-full" key={route.name}>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="px-4">{route.name}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="flex flex-col gap-2 px-4">
                          {route.more?.map((subRoute) => (
                            <li key={subRoute.name} className="w-full">
                              <Button
                                variant={currentPath === subRoute.path ? "default" : "ghost"}
                                className="w-full justify-start"
                                asChild
                              >
                                <Link to={subRoute.path}>{subRoute.name}</Link>
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <li key={route.name} className="w-full">
                    <Button
                      variant={currentPath === route.path ? "default" : "ghost"}
                      className="w-full justify-start"
                      asChild
                    >
                      <Link to={route.path}>{route.name}</Link>
                    </Button>
                  </li>
                )
              ))}
            </ul>
            <SheetFooter>
              {isAuthenticated ? (
                <>
                  <div className="flex flex-col border p-2 rounded-lg">
                    <p className="font-bold">{user?.name}</p>
                    <p className="text-sm">{user?.email}</p>
                  </div>
                </>
              ) : (
                <>
                  <Button variant={"outline"} asChild><Link to="/login">Sign in</Link></Button>
                  <Button asChild><Link to="/register">Sign up</Link></Button>
                </>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default AppNavbar