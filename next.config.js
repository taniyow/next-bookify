/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  reactStrictMode: true,
  compiler: { removeConsole: !!isProd },
  assetPrefix: isProd ? "https://veritru.vercel.app" : "http://localhost:3000",
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
};
module.exports = nextConfig;
