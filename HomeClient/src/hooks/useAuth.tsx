import { createContext, useContext } from "react"

export interface User {
  name: string
  email: string
  // tambahkan properti lain jika diperlukan
}

export interface AuthContextType {
  user: User | null
  token: string | null
  login: (userData: User, token: string) => void
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