// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://on-wifi.ru.", // URL вашего сайта
  generateRobotsTxt: true, // Генерация robots.txt
  exclude: ["/api/*"], // Исключение путей из карты сайта
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: "/api/*" },
    ],
  },
};
