import { ModeToggle } from "@/components/fragments/mode-toggel"
import bgForm from "@/assets/lumino-lambang.jpg"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useState } from "react"

type AuthFormProps = {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    children: React.ReactNode
    title: string
}

export const AuthForm = ({ handleSubmit, children, title }: AuthFormProps) => {
    return (
        <section className="w-full h-screen flex items-center justify-center p-res-xxl">

            <div className="absolute top-2 left-2">
                <Link to="/">
                    <Button variant={"outline"} size={"icon"}>
                        <ArrowLeft />
                    </Button>
                </Link>
            </div>

            <div className="absolute top-2 right-2">
                <ModeToggle />
            </div>

            <div className="absolute top-0 left-0 h-full w-full  bg-gradient-to-b from-blue-600 to-purple-600 opacity-20 dark:opacity-10 -z-10"></div>

            <div className="w-full h-full flex items-center justify-center rounded-xl border bg-background overflow-hidden">
                <div className="w-1/2 h-full bg-gradient-to-br from-indigo-600/30 to-purple-600/30 md:flex hidden items-center justify-center">
                    <img src={bgForm} alt="" className="w-full h-full object-cover filter drop-shadow-[0_0_5px_var(--color-foreground)]" />
                </div>
                <div className="md:w-1/2 w-full h-full flex flex-col gap-4 items-center justify-center px-res-xxl">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{title}</h1>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                        {children}
                    </form>
                </div>
            </div>
        </section>
    )
}

type InputFormAuthProps = {
    type: "email" | "password" | "text"
    label: "Email" | "Password" | "Username"
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    error?: string
}

export const InputFormAuth = ({ type, label, onChange, error }: InputFormAuthProps) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="flex flex-col">
            <div className="relative flex items-center">
                <input
                    onChange={onChange}
                    name={type}
                    type={type === "password" && !showPassword ? "text" : type}
                    className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    autoComplete={
                        type === "email" ? "email"
                            : type === "password" ? "current-password"
                                : type === "text" ? "username"
                                    : "on"
                    }
                />
                <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-3.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    {label}
                </label>
                {type === "password" &&
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5">
                        {showPassword ? (
                            <EyeOff className="w-5 h-5 text-gray-500" />
                        ) : (
                            <Eye className="w-5 h-5 text-gray-500" />
                        )}
                    </button>
                }
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    )
}