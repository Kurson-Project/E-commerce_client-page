import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Link, Navigate } from "react-router-dom"
import { AuthForm, InputFormAuth } from "@/components/layouts/AuthForm"
import { validateEmail, validatePassword } from "@/components/templates/ValidateForm"
import { useAuth } from "@/hooks/useAuth"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({
        email: "",
        password: ""
    })

    const { login, isAuthenticated } = useAuth()

    const dummyUser = {
        name: "Zaid Rengga",
        email: email,
    }
    const dummyToken = "1234567890abcdef"

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!email) setError({ ...error, email: "Email is required" })
        else if (!password) setError({ ...error, password: "Password is required" })
        else {
            login(dummyUser, dummyToken)
        }
    }

    if (isAuthenticated) return <Navigate to="/" />

    return (
        <AuthForm handleSubmit={handleSubmit} title="LOGIN TO YOUR ACCOUNT">
            <InputFormAuth
                type="email"
                label="Email"
                onChange={(e) => {
                    const value = e.target.value
                    setEmail(value)
                    setError({ ...error, email: validateEmail(value) })
                }}
                error={error.email}
            />
            <InputFormAuth
                type="password"
                label="Password"
                onChange={(e) => {
                    const value = e.target.value
                    setPassword(value)
                    setError({ ...error, password: validatePassword(value) })
                }}
                error={error.password}
            />
            <div className="w-full flex items-center justify-end">
                <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</Link>
            </div>
            <div className="w-full flex flex-col gap-2">
                <Button type="submit" className="w-full">Login</Button>
                <div className="flex items-center">
                    <div className="w-full border-t border-muted-foreground"></div>
                    <span className="px-2 text-sm text-muted-foreground">or</span>
                    <div className="w-full border-t border-muted-foreground"></div>
                </div>

                <Button variant="outline" className="w-full">Login with Google</Button>

                <p>Don&apos;t have an account? <Link to="/register" className="text-sm text-blue-600 hover:underline dark:text-blue-500">Register</Link></p>
            </div>
        </AuthForm>
    )
}

export default LoginPage