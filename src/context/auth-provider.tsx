"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import api from "@/lib/axios"
import { Skeleton } from "@/components/ui/skeleton"
type User = {
    id: number
    username: string
    email: string
    first_name: string
    last_name: string
    role: string
}
type AuthContextType = {
    accessToken: string | null
    login: (access: string, refresh: string) => void
    logout: () => void,
    user: User | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter()
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)
    const logout = () => {
        setAccessToken(null)
        Cookies.remove("accessToken")
        Cookies.remove("refreshToken")
        router.replace("/login") // replace instead of push (prevents back button issues)
    }

    // Check token validity by calling /me
    useEffect(() => {
        const checkAuth = async () => {
            const token = Cookies.get("accessToken")
            if (!token) {
                logout()
                return
            }
            try {
                const { data } = await api.get("/auth/me/", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setUser(data);
                setAccessToken(token)
            } catch (err) {
                console.error("Auth check failed → logging out", err)
                logout()
            } finally {
                setLoading(false)
            }
        }
        checkAuth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const login = (access: string, refresh: string) => {
        setAccessToken(access)
        Cookies.set("accessToken", access, { secure: true, sameSite: "strict" })
        Cookies.set("refreshToken", refresh, { secure: true, sameSite: "strict" })
    }

    // 🔑 Only render children if not loading and user has a token
    if (loading) {
        return (
            <Skeleton className="w-svw h-svh" />
        )
    }

    if (!accessToken) {
        return null // while redirecting, don’t flash dashboard
    }

    return (
        <AuthContext.Provider value={{ accessToken, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
