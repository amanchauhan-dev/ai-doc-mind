// app/page.tsx
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, ShieldCheck, Brain } from "lucide-react"
import { ProgressBarLink } from "@/context/progress-bar"

export default function LandingPage() {
    return (
        <main className="min-h-screen flex flex-col">
            {/* ================= Header ================= */}
            <header className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-md border-b">
                <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xl font-bold"
                    >
                        DocMind
                    </motion.h1>
                    <nav className="hidden md:flex gap-6 text-sm font-medium">
                        <a href="#hero" className="hover:text-primary transition-colors">Home</a>
                        <a href="#features" className="hover:text-primary transition-colors">Features</a>
                        <a href="#about" className="hover:text-primary transition-colors">About</a>
                        <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
                    </nav>
                </div>
            </header>

            {/* ================= Hero ================= */}
            <section id="hero" className="flex flex-col items-center text-center py-32 px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl font-bold tracking-tight"
                >
                    AI-Powered Document Classifier
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-4 max-w-2xl text-lg text-muted-foreground"
                >
                    Automatically organize Finance, HR, Legal, Contracts, Tech Reports, and Invoices.
                    Save time. Stay secure. Boost productivity.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-8 flex gap-4"
                >
                    <Button size="lg">Try it Now</Button>
                    <Button size="lg" variant="outline">View Docs</Button>
                </motion.div>
            </section>

            {/* ================= Features ================= */}
            <section id="features" className="grid gap-8 md:grid-cols-3 px-6 max-w-6xl w-full mx-auto py-20">
                <motion.div whileHover={{ scale: 1.05 }} className="transition-transform">
                    <Card className="h-full">
                        <CardHeader>
                            <FileText className="h-10 w-10 mb-2 text-primary" />
                            <CardTitle>Multi-Category</CardTitle>
                        </CardHeader>
                        <CardContent>
                            Classify Finance, HR, Legal, Contracts, Tech, and Invoices instantly.
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="transition-transform">
                    <Card className="h-full">
                        <CardHeader>
                            <ShieldCheck className="h-10 w-10 mb-2 text-primary" />
                            <CardTitle>Secure</CardTitle>
                        </CardHeader>
                        <CardContent>
                            Keep sensitive documents protected with enterprise-grade security.
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="transition-transform">
                    <Card className="h-full">
                        <CardHeader>
                            <Brain className="h-10 w-10 mb-2 text-primary" />
                            <CardTitle>AI Powered</CardTitle>
                        </CardHeader>
                        <CardContent>
                            Harness machine learning for accurate document classification.
                        </CardContent>
                    </Card>
                </motion.div>
            </section>

            {/* ================= About ================= */}
            <section id="about" className="py-20 px-6 max-w-4xl text-center mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl font-semibold"
                >
                    Why SmartDocs?
                </motion.h2>
                <p className="mt-4 text-muted-foreground">
                    Whether it’s finance reports, HR documents, or legal contracts —
                    SmartDocs ensures your files are always in the right place.
                    Let AI handle the boring stuff while you focus on what matters.
                </p>
            </section>

            {/* ================= Contact ================= */}
            <section id="contact" className="py-20 px-6 text-center bg-muted/30 w-full">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-3xl font-semibold"
                >
                    Get in Touch
                </motion.h2>
                <p className="mt-2 text-muted-foreground">Have questions? We’d love to hear from you.</p>
                <div className="mt-6 flex justify-center">
                    <Button size="lg">Contact Us</Button>
                </div>
            </section>

            {/* ================= Footer ================= */}
            <footer className="w-full py-6 border-t mt-auto bg-background text-center text-sm text-muted-foreground">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
                    <p>© {new Date().getFullYear()} SmartDocs. Built at Hackathon 🚀</p>
                    <div className="flex gap-6 mt-2 md:mt-0">
                        <ProgressBarLink href="#docs" className="hover:text-primary">Docs</ProgressBarLink>
                        <ProgressBarLink href="https://github.com" target="_blank" className="hover:text-primary">GitHub</ProgressBarLink>
                        <ProgressBarLink href="#contact" className="hover:text-primary">Contact</ProgressBarLink>
                    </div>
                </div>
            </footer>
        </main>
    )
}