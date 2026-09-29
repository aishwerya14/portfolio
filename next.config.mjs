/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `npm run build` writes a plain website to /out that any host can serve.
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
