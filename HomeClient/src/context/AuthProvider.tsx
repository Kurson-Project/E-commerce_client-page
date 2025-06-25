import { AuthContext, type User } from "@/hooks/useAuth"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token")
    if (!token) {
      return;
    }
    const payload = parseJwt(token);
    setUser({
      name: payload.username,
      email: payload.user_email
    });

    const getUser = async () => {
      try {
        const response = await fetch(`${API_URI}/user`, {
          method: "GET",
          headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        })
        const data = await response.json()
        setUser({
          name: data.data.username,
          email: data.data.user_email
        })
      } catch (error) {
        console.log(error)
      }
    }

    getUser()
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
      }
      if (response.ok) {
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
        return true
      }

      const data = await response.json()
      console.log(data)
      saveToken(data.data.token)
      setUser(data.data)
      setLoading(false)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    Cookies.remove("token")
  }

  useEffect(() => {
    if (user && user.name === undefined) {
      setIsAuthenticated(false)
    } else if (!user) {
      setIsAuthenticated(false)
    } else if (!Cookies.get("token")) {
      setIsAuthenticated(false)
    } else {
      setIsAuthenticated(true)
    }
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
