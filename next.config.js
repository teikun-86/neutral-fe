/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
        "purecatamphetamine.github.io",
        "graph.facebook.com",
        "lh3.googleusercontent.com",
        "avatars.githubusercontent.com",
        "localhost",
        "neutral-be.io"
    ]
  }
}

module.exports = nextConfig
