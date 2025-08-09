/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack(config, { isServer }) {
    if (isServer) {
      (async () => {
        const { execSync } = await import('child_process');
        execSync('node ./postbuild.js');
      })();
    }
    return config;
  },
}

export default nextConfig
