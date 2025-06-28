import { AuthContext, type User } from "@/hooks/useAuth"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { Navigate } from "react-router-dom"

const API_URI = import.meta.env.VITE_API_URI

const saveToken = (token: string) => {
  Cookies.set("token", token, { expires: 7, path: "/", secure: false })
}

const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (err) {
    console.error("Invalid token", err)
    return null
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState({
    login: "",
    register: "",
    logout: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token")
    if (!token) {
      setIsAuthenticated(false)
      return;
    }
    const payload = parseJwt(token);
    console.log(payload)
    setUser({
      name: payload.username,
      email: payload.user_email
    })
    setIsAuthenticated(true)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URI}/auth/login`, {
        method: "POST",
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: email,
          user_password: password
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError({ ...error, login: errorData.message })
        throw new Error(errorData.message)
      }

      const data = await response.json()
      saveToken(data.data.token)
      setUser(data.data)
      setLoading(false)
      setIsAuthenticated(true)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URI}/auth/register`, {
        method: "POST",
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          user_email: email,
          user_password: password
        }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        setError({ ...error, register: errorData.message })
        throw new Error(errorData.message)
      } else if (response.ok) {
        const resLogin = await fetch(`${API_URI}/auth/login`, {
          method: "POST",
          headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_email: email,
            user_password: password
          }),
        })
        if (!resLogin.ok) {
          const errorLogin = await resLogin.json()
          setError({ ...error, login: errorLogin.message })
          throw new Error(errorLogin.message)
        }
        const dataLogin = await resLogin.json()

        saveToken(dataLogin.data.token)
        setUser(dataLogin.data)
        setIsAuthenticated(true)
        return true
      }

      setLoading(false)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const google = () => {
    setIsAuthenticated(true)
    return window.location.href = `${API_URI}/auth/google?redirect=${window.location.href}/google`
  }

  const logout = () => {
    setUser(null)
    Cookies.remove("token")
    setIsAuthenticated(false)
    return <Navigate to={"/login"} />
  }
  console.log(isAuthenticated)
  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        login,
        register,
        google,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
