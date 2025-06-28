import { FadeIn } from "@/components/templates/animated/FadeMotion";
import CardProduk from "@/components/templates/card/CardProduk";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Funnel, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductCategoryJson from "@/data/productCategory.json";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductProps } from "@/hooks/useProduct";
import useProduct from "@/hooks/useProduct";
import Loading from "@/components/layouts/Loading";

const ProductPage = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterTools, setFilterTools] = useState<string[]>([]);
  const [allTools, setAllTools] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"default" | "az" | "za" | "rating" | "priceAsc" | "priceDesc">("default");

  const location = useLocation().pathname;
  const categories = ProductCategoryJson;

  const { products, loading } = useProduct()

  useEffect(() => {
    const pathToCategoryMap: Record<string, string> = {
      "/products/website-builder": "Website Builder",
      "/products/ai-automation": "AI Automation",
      "/products/customize": "Customize",
    };
    setSelectedCategory(pathToCategoryMap[location] || "All Products");
  }, [location]);

  useEffect(() => {
    const filtered = products.filter((produk) => {
      const matchTitle = produk.title.toLowerCase().includes(inputSearch.toLowerCase());
      const matchCategory = selectedCategory === "All Products" || produk.category === selectedCategory;
      const matchTools = filterTools.length === 0 || produk.tools.some((tool) => filterTools.includes(tool.name));
      return matchTitle && matchCategory && matchTools;
    });

    switch (sortBy) {
      case "az":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "priceAsc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilteredProducts(filtered);
  }, [inputSearch, selectedCategory, filterTools, sortBy, products]);

  useEffect(() => {
    const toolsSet = new Set<string>();
    products.forEach((produk) => {
      produk.tools.forEach((tool) => toolsSet.add(tool.name));
    });
    setAllTools(Array.from(toolsSet));
  }, [products]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="absolute top-0 left-0 h-full w-full -z-10 bg-gradient-to-b from-blue-600 via-purple-600 to-transparent opacity-10"></div>

      <section className="w-full px-res-xxl pt-20">
        <FadeIn direction="up" className="w-full flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-secondary text-center">
            {categories.find((category) => category.name === selectedCategory)?.name || "Discover Digital Products"} <span className="text-primary">From Lumino</span>
          </h1>
          <p className="text-muted-foreground text-center">
            {categories.find((category) => category.name === selectedCategory)?.description || "Discover digital products from AI tools to templates with ease, speed, and full control."}
          </p>
        </FadeIn>
      </section>

      <hr className="mt-10" />

      <section className="w-full flex flex-col justify-center px-res-xxl pb-20">
        <div className="flex w-full md:flex-row flex-col justify-between items-center gap-2">
          <div className="flex gap-2 overflow-x-auto flex-nowrap w-full scrollbar-hidden py-4">
            <Button
              variant={selectedCategory === "All Products" ? "default" : "outline"}
              className="rounded-full shrink-0"
              onClick={() => setTimeout(() => setSelectedCategory("All Products"), 500)}
              asChild
            >
              <Link to="/products">All Products</Link>
            </Button>

            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                className="rounded-full shrink-0"
                onClick={() => setTimeout(() => setSelectedCategory(category.name), 500)}
                asChild
              >
                <Link to={category.path}>{category.name}</Link>
              </Button>
            ))}
          </div>

          {location === "/products/customize" ? null : (

            <div className="flex gap-2 items-center md:py-4 py-0 pb-4">
              <Button variant="outline" onClick={() => setFilterOpen(!filterOpen)}>
                <Funnel /> Filter
              </Button>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <Search stroke="var(--color-muted-foreground)" />
                </div>
                <input
                  value={inputSearch}
                  onChange={(e) => setInputSearch(e.target.value)}
                  type="text"
                  placeholder="Search..."
                  className="px-4 py-1 ps-10 md:w-[200px] w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

          )}
        </div>
        {filterOpen && (
          <div className="w-full flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <h3>Sort By :</h3>
              <Select onValueChange={(value) => setSortBy(value as typeof sortBy)} value={sortBy}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort By</SelectLabel>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="az">A-Z</SelectItem>
                    <SelectItem value="za">Z-A</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                    <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 py-4">
              <h3>Tools :</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" className="w-[200px] justify-between overflow-hidden">
                    {filterTools.length > 0 ? filterTools.join(", ") : "Select tools"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search framework..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {allTools.map((tool) => (
                          <CommandItem
                            key={tool}
                            onSelect={() => {
                              setFilterTools((prev) =>
                                prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
                              );
                            }}
                          >
                            <Check className={cn("h-4 w-4", filterTools.includes(tool) ? "opacity-100" : "opacity-0")} />
                            {tool}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
        <hr className="mb-4" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((produk, index) => (
            <FadeIn key={index}>
              <CardProduk
                title={produk.title}
                image={produk.image}
                price={produk.price}
                tools={produk.tools}
                rating={produk.rating}
              />
            </FadeIn>
          ))}
        </div>

        {location === "/products/customize" && (
          <div className="w-full flex flex-col items-center justify-center gap-4 px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-secondary text-center">
              Customize Your Product
            </h1>

            <div className="flex items-center justify-center w-full max-w-2xl">
              <Tabs defaultValue="website" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="website">Website</TabsTrigger>
                  <TabsTrigger value="aiagent">AI Agent</TabsTrigger>
                </TabsList>

                <TabsContent value="website">
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
                      <div className="grid gap-2">
                        <Label htmlFor="tech-stack">Tech Stack</Label>
                        <Input id="tech-stack" placeholder="React / TailwindCSS / Next.js / etc." />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Save Website</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="aiagent">
                  <Card className="bg-background">
                    <CardHeader>
                      <CardTitle>AI Agent</CardTitle>
                      <CardDescription>Customize your AI agent</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="agent-name">Agent Name</Label>
                        <Input id="agent-name" placeholder="e.g. LumiBot" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="agent-role">Agent Role</Label>
                        <Textarea id="agent-role" placeholder="e.g. Handles product recommendations and customer queries." />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="tone-style">Tone & Personality</Label>
                        <Input id="tone-style" placeholder="Friendly, Professional, Playful, etc." />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Save Agent</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ProductPage;