import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Screenshots carry small UI text, so they are encoded a little above the default 75.
  images: { qualities: [85] },
}

export default nextConfig
