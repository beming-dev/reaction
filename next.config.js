/** @type {import('next').NextConfig} */

const debug = process.env.NODE_ENV !== "production";
const repository = "https://beming-dev.github.io/reaction";

const nextConfig = {
  reactStrictMode: true,
  basePath: "/reaction",
  assetPrefix: !debug ? `/reaction/` : "", // production 일때 prefix 경로
  trailingSlash: true, // 빌드 시 폴더 구조 그대로 생성하도록
};

module.exports = nextConfig;
