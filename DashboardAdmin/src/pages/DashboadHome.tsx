import { ChartAreaGradient } from "@/components/templates/ChartTemplate"
import { ShoppingBag, ShoppingCart, User2 } from "lucide-react"

const DashboadHome = () => {
    return (
        <>
            <section className="w-full grid grid-cols-6">
                <div className="col-span-4 bg-background flex flex-col gap-2 rounded-md p-2 border shadow">
                    <h1 className="text-2xl font-bold text-secondary">Dashboard <span className="text-primary font-extrabold">Lumino</span></h1>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-amber-500/10 rounded-md p-2 flex items-center justify-center gap-2">
                            <User2 className="size-12 text-amber-500" />
                            <div className="flex flex-col justify-center">
                                <h3 className="font-semibold">Users</h3>
                                <h2 className="">20</h2>
                            </div>
                        </div>
                        <div className="bg-blue-500/10 rounded-md p-2 flex items-center justify-center gap-2">
                            <ShoppingBag className="size-12 text-blue-500" />
                            <div className="flex flex-col justify-center">
                                <h3 className="font-semibold">Product</h3>
                                <h2 className="">20</h2>
                            </div>
                        </div>
                        <div className="bg-purple-500/10 rounded-md p-2 flex items-center justify-center gap-2">
                            <ShoppingCart className="size-12 text-purple-500" />
                            <div className="flex flex-col justify-center">
                                <h3 className="font-semibold">Orders</h3>
                                <h2 className="">20</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2"></div>
            </section>

            <section className="w-full grid grid-cols-6 gap-2">
                <div className="col-span-3">
                    <ChartAreaGradient />
                </div>
                <div className="col-span-3"></div>
            </section>
        </>
    )
}

export default DashboadHome