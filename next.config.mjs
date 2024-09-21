/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sloth-possible-reindeer.ngrok-free.app',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '192.168.8.183',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
