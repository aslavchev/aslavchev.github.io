interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

export function rateLimit(identifier: string, limit = 10, windowMs = 60000): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    })
    return true
  }

  if (entry.count >= limit) {
    return false
  }

  entry.count++
  return true
}

export function getRateLimitStatus(identifier: string): { remaining: number; resetTime: number } {
  const entry = rateLimitMap.get(identifier)
  const now = Date.now()

  if (!entry || now > entry.resetTime) {
    return { remaining: 10, resetTime: now + 60000 }
  }

  return {
    remaining: Math.max(0, 10 - entry.count),
    resetTime: entry.resetTime,
  }
}

// Clean up old entries every 5 minutes
setInterval(
  () => {
    const now = Date.now()
    for (const [key, entry] of rateLimitMap.entries()) {
      if (now > entry.resetTime) {
        rateLimitMap.delete(key)
      }
    }
  },
  5 * 60 * 1000,
)
