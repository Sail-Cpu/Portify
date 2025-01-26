/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        serverActions: {
            bodySizeLimit: '5mb',
        },
    },
};

export default nextConfig;
