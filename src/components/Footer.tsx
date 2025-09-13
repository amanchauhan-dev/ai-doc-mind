import React from 'react'
import { Badge } from './ui/badge'
import { Search, Shield, Sparkles } from 'lucide-react'

function Footer() {
  return (
    <footer className="border-t bg-background/50 px-4 md:px-0">
        <div className="container py-16 md:py-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="size-6 rounded bg-gradient-to-br from-primary to-blue-600" />
              <span className="font-semibold text-lg">IndexIQ</span>
            </div>
            <p className="text-sm text-muted-foreground">AI-powered document classification and intelligent indexing.</p>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="rounded-md">
                <Shield className="mr-1 size-3" />On-prem ready
              </Badge>
              <Badge variant="secondary" className="rounded-md">
                <Sparkles className="mr-1 size-3" />Open Source
              </Badge>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold">Product</p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li><a href="#features" className="hover:text-foreground">Features</a></li>
              <li><a href="#how" className="hover:text-foreground">How it works</a></li>
              <li><a href="#security" className="hover:text-foreground">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t">
          <div className="container flex flex-col md:flex-row items-center justify-between py-8 md:py-10 text-xs text-muted-foreground gap-3 md:gap-0">
            <span>© {new Date().getFullYear()} IndexIQ</span>
            <span className="flex items-center gap-2"><Search className="size-3" />Semantic by design</span>
          </div>
        </div>
      </footer>
  )
}

export default Footer