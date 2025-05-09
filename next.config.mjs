/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'upload.wikimedia.org', 'workoutshop.s3.eu-north-1.amazonaws.com'],
    // You can add more domains as needed:
    // domains: ['images.unsplash.com', 'example.com', 'another-domain.com'],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
}

export default nextConfig