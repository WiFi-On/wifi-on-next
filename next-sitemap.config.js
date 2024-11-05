// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://on-wifi.ru.", // URL вашего сайта
  generateRobotsTxt: true, // Генерация robots.txt
  exclude: [
    "/api/*",
    "/sitemap.xml",
    "/robots.txt",
    "/auth",
    "/admin",
    "/imgs/*",
  ], // Исключение путей из карты сайта
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: "/api/*" },
      { userAgent: "*", disallow: "/auth" },
      { userAgent: "*", disallow: "/admin" },
      { userAgent: "*", disallow: "/imgs/*" },
      { userAgent: "*", disallow: "/sitemap.xml" },
      { userAgent: "*", disallow: "/robots.txt" },
      { userAgent: "*", disallow: "/sitemap-0.xml" },
    ],
  },
};
