import { FadeIn } from "@/components/templates/animated/FadeMotion"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const AboutPage = () => {
    return (
        <div className="w-full flex flex-col items-center gap-10 p-res-xxl pt-20 bg-gradient-to-br from-background to-purple-600/10">
            <section className="w-full bg-background p-res-xxl rounded-xl border shadow-[0_0_10px_rgba(0,0,0,0.3)]">
                <FadeIn className="w-full flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold text-secondary text-center">Tentang <span className="text-primary">LUMINO</span></h1>
                    <p className="text-muted-foreground text-center">
                        Lumino adalah gerbang Anda menuju produk digital berkualitas tinggi—mulai dari template website dan UI aplikasi mobile, hingga sistem operasi AI canggih dan konfigurasi data center yang skalabel. Kami hadir untuk memperkuat proyek digital Anda berikutnya dengan aset digital yang dibuat oleh para profesional industri.  
                        <br /><br />
                        Di Lumino, kami percaya bahwa setiap individu dan bisnis berhak berkembang di era digital. Kami adalah mitra terpercaya Anda dalam menyediakan produk digital premium yang dirancang untuk meningkatkan kehadiran online dan menyederhanakan operasional Anda.
                    </p>
                </FadeIn>
            </section>

            <section className="w-full bg-background flex flex-col items-center justify-center p-res-xxl rounded-xl border shadow-[0_0_10px_rgba(0,0,0,0.3)]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FadeIn className="p-6 bg-blue-500/10 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-bold text-blue-700">Misi Kami</h3>
                        <p className="text-muted-foreground">
                            Menyediakan solusi digital mutakhir dan berkualitas tinggi yang mudah diakses, inovatif, dan relevan dengan kebutuhan dunia digital yang terus berkembang.
                        </p>
                    </FadeIn>
                    <FadeIn className="p-6 bg-purple-500/10 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-bold text-purple-700">Visi Kami</h3>
                        <p className="text-muted-foreground">
                            Menjadi marketplace digital terdepan, membangun komunitas tempat kreativitas dan teknologi bersatu, dan mewujudkan setiap ambisi digital.
                        </p>
                    </FadeIn>
                    <FadeIn className="p-6 bg-green-500/10 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-bold text-green-700">Komitmen Kami</h3>
                        <p className="text-muted-foreground">
                            Kami berkomitmen untuk memberikan layanan terbaik, pengalaman pengguna yang mulus, dan produk yang benar-benar berdampak bagi pelanggan kami.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <section className="w-full bg-background flex flex-col items-center justify-center gap-6 p-res-xxl rounded-xl border shadow-[0_0_10px_rgba(0,0,0,0.3)]">
                <FadeIn className="text-3xl md:text-4xl font-bold text-secondary">Apa yang Kami Tawarkan</FadeIn>

                <FadeIn className="flex flex-wrap justify-center gap-6">
                    <div className="bg-card rounded-full px-6 py-3 text-lg font-medium text-muted-foreground shadow-sm">
                        Template Website
                    </div>
                    <div className="bg-card rounded-full px-6 py-3 text-lg font-medium text-muted-foreground shadow-sm">
                        Operasi Sistem AI
                    </div>
                </FadeIn>

                <FadeIn className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    Mulai dari <b>template website</b> yang menawan untuk memperkuat kehadiran online Anda, hingga <b>operasi sistem AI</b> yang mengotomatisasi dan mengoptimalkan alur kerja bisnis, serta <b>solusi data center</b> yang kokoh untuk stabilitas dan keamanan—Lumino adalah solusi lengkap Anda. Setiap produk dibuat dengan ketelitian, dirancang untuk performa maksimal, dan dilandasi semangat inovasi.
                </FadeIn>

                <Button className="rounded-full" size="xl" asChild>
                    <Link to="/products">
                        Jelajahi Produk
                    </Link>
                </Button>
            </section>
        </div>
    )
}

export default AboutPage