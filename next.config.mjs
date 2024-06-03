/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/get_tariffs",
        destination: "https://on-wifi.ru/get_tariffs",
      },
    ];
  },
};

export default nextConfig;
