"use client"

import { useState, useRef, DragEvent, ReactNode } from "react"
import { motion } from "framer-motion"
import { Upload, File as FileIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import api from "@/lib/axios"
import { toast } from "sonner"

interface FileUploadDialogProps {
    trigger: string | ReactNode
    onSuccess?: () => void // callback after successful upload
}

export default function FileUploadDialog({ trigger, onSuccess }: FileUploadDialogProps) {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [open, setOpen] = useState(false) // control dialog open state

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0])
        }
    }

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    }

    const handleClickBrowse = () => {
        fileInputRef.current?.click()
    }

    const handleUpload = async () => {
        if (!file) return
        setUploading(true)
        setError(null)

        const formData = new FormData()
        formData.append("file", file)
        formData.append("title", file.name) // optional: you can add more fields

        try {
            const res = await api.post("/documents/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            console.log("Upload successful:", res.data)
            setFile(null)

            // Close dialog
            setOpen(false)

            // Show toast
            toast.success(
                `${file.name} has been uploaded.`,
            )

            if (onSuccess) onSuccess()
        } catch (err: any) {
            console.error("Upload failed:", err)
            setError(err?.response?.data?.detail || "Upload failed")
        } finally {
            setUploading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {typeof trigger === "string" ? <Button>{trigger}</Button> : trigger}
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                </DialogHeader>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={handleClickBrowse}
                    className="border-2 border-dashed border-muted-foreground/40 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                >
                    <Upload className="w-10 h-10 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Click or drag & drop a file here</p>

                    <Input ref={fileInputRef} type="file" className="hidden" onChange={handleBrowse} />
                </motion.div>

                {/* File Preview */}
                {file && (
                    <div className="mt-6 space-y-3">
                        <h3 className="font-semibold text-lg">Selected File</h3>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 bg-muted p-3 rounded-lg justify-between"
                        >
                            <div className="flex items-center gap-2">
                                <FileIcon className="w-5 h-5 text-primary" />
                                <span className="truncate">{file.name}</span>
                            </div>

                            <Button
                                size="sm"
                                onClick={handleUpload}
                                disabled={uploading}
                            >
                                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Upload"}
                            </Button>
                        </motion.div>
                        {error && <p className="text-destructive text-sm">{error}</p>}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
