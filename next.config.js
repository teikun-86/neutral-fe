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
        "neutral-be.io",
        "secure.gravatar.com"
    ]
  },
  i18n: {
    locales: ['id', 'en', 'jp'],
    defaultLocale: 'id',
    localeDetection: true,
  }
}

module.exports = nextConfig
