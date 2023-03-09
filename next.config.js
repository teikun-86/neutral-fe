const securityHeaders = [
    {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
    },
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains; preload',
    },
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    },
    {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
    },
    {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin',
    },
    {
        key: 'Content-Security-Policy',
        value: `default-src 'self' ${process.env.NEXT_PUBLIC_BACKEND_URL} https://purecatamphetamine.github.io;script-src 'self' ${process.env.NEXT_PUBLIC_BACKEND_URL} https://purecatamphetamine.github.io 'unsafe-inline' 'unsafe-eval';child-src 'self' ${process.env.NEXT_PUBLIC_BACKEND_URL} https://purecatamphetamine.github.io;style-src 'self' ${process.env.NEXT_PUBLIC_BACKEND_URL} https://purecatamphetamine.github.io 'unsafe-inline';img-src 'self' ${process.env.NEXT_PUBLIC_BACKEND_URL} https://purecatamphetamine.github.io data:;font-src 'self' ${process.env.NEXT_PUBLIC_BACKEND_URL} https://purecatamphetamine.github.io data:;connect-src 'self' ${process.env.NEXT_PUBLIC_BACKEND_URL} https://purecatamphetamine.github.io;frame-src 'self' ${process.env.NEXT_PUBLIC_BACKEND_URL} https://purecatamphetamine.github.io;object-src 'none';`,
    }
]

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
            "secure.gravatar.com",
            "travel-neutral.sintegra.cloud"
        ]
    },
    i18n: {
        locales: ['id-ID', 'en-US'],
        defaultLocale: 'id-ID',
        localeDetection: true,
    },
    // async headers() {
    //     return [
    //         {
    //             source: '/:path*',
    //             headers: securityHeaders,
    //         },
    //     ]
    // }
}

module.exports = nextConfig
