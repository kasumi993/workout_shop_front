/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'upload.wikimedia.org','pub-3dbe164ddc2940d0b9e85e3a5df22a9a.r2.dev'],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
}

export default nextConfig