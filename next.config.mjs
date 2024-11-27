/** @type {import('next').NextConfig} */
const nextConfig = {
   // output : "export",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'seapi.pythonanywhere.com',
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
