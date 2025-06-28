
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { type AllUser, AuthContext, type User } from "@/hooks/useAuth"

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
  const [allUser, setAllUser] = useState<AllUser[] | null>(null);
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
      email: payload.user_email,
      role: payload.role
    });
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API_URI}/default/user`, {
          method: "GET",
          headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("token")}`
          }
        })
        const data = await response.json()
        setAllUser(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
    fetchData()
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
      setLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    Cookies.remove("token")
  }

  useEffect(() => {
    const noAccess =
      !user ||                     // belum login
      !user.name ||               // user tidak memiliki nama
      user.role === "user" ||     // role adalah "user", bukan admin
      !Cookies.get("token");      // tidak ada token

    setIsAuthenticated(!noAccess);
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        user,
        allUser: allUser as AllUser[],
        error,
        loading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
