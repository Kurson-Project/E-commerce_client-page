import { createContext, useContext } from "react"

export interface User {
  name: string
  email: string
  role: "admin" | "user"
  // tambahkan properti lain jika diperlukan
}

export interface AllUser {
  name: string
  email: string
  role: "admin" | "user"
  // tambahkan properti lain jika diperlukan
}

export interface AuthContextType {
  user: User | null
  allUser: AllUser[]
  error: { login: string; register: string; logout: string }
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}