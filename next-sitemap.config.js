import { api } from "./public/host/host.js"; // Импорт API

/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: process.env.SITE_URL || "https://on-wifi.ru", // URL вашего сайта
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
    ],
    additionalSitemaps: ["https://on-wifi.ru/sitemap.xml"],
  },

  additionalPaths: async (config) => {
    // Пример списка городов для создания динамических URL
    const response = await fetch(`${api}/aggregator/get/allDistricts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "g2H3Ym90U3nmhStLikyWOLM662xaiG6BK3l41pYq",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch city data");
    }

    const cities = await response.json();

    // Создаем пути для каждой страницы с городами
    const dynamicPaths = cities.map((city) => ({
      loc: `/${city}/tariffs`, // Страница с тарифами для города
      lastmod: new Date().toISOString(),
    }));

    return dynamicPaths; // Возвращаем список с динамическими путями
  },
};

export default sitemapConfig; // Экспортируем переменную с конфигом
