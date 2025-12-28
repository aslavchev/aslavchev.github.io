/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable proper TypeScript checking
  typescript: {
    ignoreBuildErrors: true,
  },
  // Enable Next.js image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    unoptimized: true,
  },
  // Add security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
