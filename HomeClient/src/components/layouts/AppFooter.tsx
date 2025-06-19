import { Instagram, Music2, Phone } from "lucide-react"
import { Link } from "react-router-dom"

const AppFooter = () => {
    return (
        <footer className="w-full py-4 bg-foreground/5 shadow-[0_0_10px_rgba(0,0,0,0.3)]">
            <div className="flex justify-center items-center w-full gap-2 px-res-xxl">
                <h1 className="text-2xl text-shadow-2xs font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">LUMINO</h1>
                <div className="w-full border-t"></div>
                <div className="flex gap-2 items-center">
                    <Instagram />
                    <Phone />
                    <Music2 />
                </div>
            </div>

            <div className="flex justify-center items-center w-full gap-2 px-res-xxl">
                <Link to="/about" className="hover:text-indigo-600">About</Link>
                <Link to="/contact" className="hover:text-indigo-600">Contact</Link>
                <Link to="/privacy" className="hover:text-indigo-600">Privacy</Link>
                <Link to="/terms" className="hover:text-indigo-600">Terms</Link>
            </div>

            <div className="w-full border-t my-4"></div>
            <p className="text-center text-sm text-muted-foreground">
                &copy; 2023 LUMINO. All rights reserved.
            </p>
        </footer>
    )
}

export default AppFooter