import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Link, Navigate } from "react-router-dom"
import { AuthForm, InputFormAuth } from "@/components/layouts/AuthForm"
import { validateEmail, validatePassword, validateUsername } from "@/components/templates/ValidateForm"
import { useAuth } from "@/hooks/useAuth"

const RegisterPage = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({
        username: "",
        email: "",
        password: ""
    })

    const { login, isAuthenticated } = useAuth()

    const dummyUser = {
        name: username,
        email: email,
    }
    const dummyToken = "1234567890abcdef"

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!username) setError({ ...error, username: "Username is required" })
        else if (!email) setError({ ...error, email: "Email is required" })
        else if (!password) setError({ ...error, password: "Password is required" })
        else {
            login(dummyUser, dummyToken)
        }
    }

    if (isAuthenticated) return <Navigate to="/" />

    return (
        <AuthForm handleSubmit={handleSubmit} title="CREATE YOUR ACCOUNT">
            <InputFormAuth
                type="text"
                label="Username"
                onChange={(e) => {
                    const value = e.target.value
                    setUsername(value)
                    setError({ ...error, username: validateUsername(value) })
                }}
                error={error.username}
            />
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
            <div className="w-full flex items-center text-sm text-muted-foreground">
                Have you agreed to the <Link to="/terms" className="text-blue-600 ml-1 hover:underline dark:text-blue-500">Terms and Conditions</Link>?
                <input type="checkbox" className="ml-2" />
            </div>
            <div className="w-full flex flex-col gap-2">
                <Button type="submit" className="w-full">Register</Button>
                <div className="flex items-center">
                    <div className="w-full border-t border-muted-foreground"></div>
                    <span className="px-2 text-sm text-muted-foreground">or</span>
                    <div className="w-full border-t border-muted-foreground"></div>
                </div>

                <Button variant="outline" className="w-full">Login with Google</Button>
                <div className="w-full flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <span>Already have an account?</span>
                    <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-500">Login</Link>
                </div>
            </div>
        </AuthForm>
    )
}

export default RegisterPage