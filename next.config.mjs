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
                hostname: '192.168.8.110',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '192.168.1.103',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
