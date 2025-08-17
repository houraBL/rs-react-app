/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist', // Changes the build output directory to `./dist/`.
  images: {
    domains: ['rickandmortyapi.com'],
  },
};

export default nextConfig;
