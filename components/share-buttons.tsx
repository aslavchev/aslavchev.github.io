"use client"

import { Button } from "@/components/ui/button"
import { Share2, Linkedin, Twitter, Link as LinkIcon } from "lucide-react"
import { useState } from "react"

interface ShareButtonsProps {
  title: string
  url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex items-center gap-4 pt-8 border-t">
      <span className="text-sm text-muted-foreground">Share:</span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(shareLinks.linkedin, '_blank')}
          aria-label="Share on LinkedIn"
          className="cursor-pointer hover:bg-[#0077B5]/10 hover:border-[#0077B5] transition-colors"
        >
          <Linkedin className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(shareLinks.twitter, '_blank')}
          aria-label="Share on Twitter"
          className="cursor-pointer hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2] transition-colors"
        >
          <Twitter className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          aria-label="Copy link"
          className="cursor-pointer hover:bg-primary/10 hover:border-primary transition-colors"
        >
          <LinkIcon className="h-4 w-4" />
          {copied && <span className="ml-2 text-xs">Copied!</span>}
        </Button>
      </div>
    </div>
  )
}
