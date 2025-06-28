import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { AuthForm, InputFormAuth } from "@/components/layouts/AuthForm"
import { validateEmail, validatePassword } from "@/lib/ValidateForm"
import { useAuth } from "@/hooks/useAuth"
import Cookies from "js-cookie"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({
        login: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const { login, isAuthenticated, error: authError, loading, google } = useAuth()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Validasi
        if (!email) return setError({ ...error, email: "Email is required" })
        else if (!password) return setError({ ...error, password: "Password is required" })
        else {
            const isLogin = await login(email, password)
            if (isLogin) {
                window.location.reload()
                navigate("/")
            } else {
                setError({ ...error, login: authError.login })
            }
        }
    }
    if (isAuthenticated) return <Navigate to="/" />

    return (
        <AuthForm handleSubmit={handleSubmit} title="LOGIN TO YOUR ACCOUNT">
            {error.login && <p className="text-red-500 text-sm">{error.login}</p>}
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
                <Button type="submit" disabled={loading} className="w-full">{loading ? "Loading..." : "Login"}</Button>
                <div className="flex items-center">
                    <div className="w-full border-t border-muted-foreground"></div>
                    <span className="px-2 text-sm text-muted-foreground">or</span>
                    <div className="w-full border-t border-muted-foreground"></div>
                </div>

                <Button variant="outline" type="button" className="w-full" disabled={loading} onClick={() => google()}>
                    <img src="https://www.svgrepo.com/show/353817/google-icon.svg" alt="" className="h-full" />
                    Login with Google
                </Button>

                <p>Don&apos;t have an account? <Link to="/register" className="text-sm text-blue-600 hover:underline dark:text-blue-500">Register</Link></p>
            </div>
        </AuthForm>
    )
}

export const LoginGoogleCallback = () => {
    const token = useLocation().search.split("=")[1].split("&")[0]

    const saveToken = (token: string) => {
        Cookies.set("token", token, { expires: 7, path: "/", secure: false })
    }

    useEffect(() => {
        if (token) saveToken(token)
    }, [token])

    return <Navigate to={"/"} />
}

export default LoginPage