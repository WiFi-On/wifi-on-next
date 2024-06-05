/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/get_tariff/:tariffId",
        destination: "https://on-wifi.ru/get_tariff/:tariffId",
      },
    ];
  },
};

export default nextConfig;
