// components/file-upload-dialog.tsx
"use client"

import { useState, useRef, DragEvent, ReactNode } from "react"
import { motion } from "framer-motion"
import { Upload, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface FileUploadDialogProps {
    trigger: string | ReactNode
}

export default function FileUploadDialog({ trigger }: FileUploadDialogProps) {
    const [file, setFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]) // only take the first file
        }
    }

    const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]) // only one file
        }
    }

    const handleClickBrowse = () => {
        fileInputRef.current?.click()
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {typeof trigger === "string" ? (
                    <Button>{trigger}</Button>
                ) : (
                    trigger
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                </DialogHeader>

                {/* Drag & Drop Zone (also clickable) */}
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

                    {/* Hidden input */}
                    <Input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleBrowse}
                    />
                </motion.div>

                {/* File Preview */}
                {file && (
                    <div className="mt-6 space-y-3">
                        <h3 className="font-semibold text-lg">Uploaded File</h3>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 bg-muted p-3 rounded-lg"
                        >
                            <File className="w-5 h-5 text-primary" />
                            <span className="truncate">{file.name}</span>
                        </motion.div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
