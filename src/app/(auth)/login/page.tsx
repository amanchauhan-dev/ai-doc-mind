"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Cookies from "js-cookie"
import api from "@/lib/axios"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!email || !password) {
            setError("Please enter both email and password.")
            return
        }

        setLoading(true)
        try {
            const res = await api.post("/auth/login/", {
                username: email,
                password,
                remember,
            })

            if (res.data?.access) {
                // Save token in cookie
                Cookies.set("accessToken", res.data.access, {
                    expires: remember ? 7 : 1, // 7 days if remember checked
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                })

                router.push("/dashboard")
            } else {
                setError("Invalid response from server.")
            }
        } catch (err: any) {
            // console.error("Login error:", err)
            setError(err.response?.data?.message || "Invalid credentials.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-background">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md px-6 py-12"
            >
                <Card className="shadow-lg">
                    <CardHeader className="px-8 pt-8">
                        <CardTitle className="text-2xl">Welcome back</CardTitle>
                        <p className="text-sm text-muted-foreground mt-2">
                            Sign in to access your SmartDocs dashboard
                        </p>
                    </CardHeader>

                    <CardContent className="px-8 pb-8 pt-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email */}
                            <div>
                                <Label htmlFor="email" className="text-sm">Email</Label>
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="username or you@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-2"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <Label htmlFor="password" className="text-sm">Password</Label>
                                <div className="relative mt-2">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((s) => !s)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-accent/10 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="w-4 h-4 text-muted-foreground" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember + Forgot */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2">
                                    <Checkbox
                                        checked={remember}
                                        onCheckedChange={(v) => setRemember(Boolean(v))}
                                    />
                                    <span className="text-sm">Remember me</span>
                                </label>

                                <a href="/auth/forgot" className="text-sm hover:text-primary transition-colors">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Error */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-destructive"
                                >
                                    {error}
                                </motion.div>
                            )}

                            {/* Submit */}
                            <div className="pt-2">
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Signing in...
                                        </span>
                                    ) : (
                                        "Sign in"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </main>
    )
}
