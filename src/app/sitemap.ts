// app/sitemap.ts
import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.coffee-time.online";

  // Статические пути
  const staticPages = [
    "",
    "/about",
    "/business",
    "/career",
    "/franchising",
    "/jobrequest",
    "/request",
    "/bonuses",
    "/event",
    "/priceListPage",
    "/contacts",
    "/restaurants",
    "/zonesAndDeliver",
    "/ceeds",
    "/delivery",
    "/policy",
    "/review",
    "/user",
    "/user/login",
    "/user/register",
  ];

  // Динамические пути (пример для продуктов)
  const products = await getProductsFromDB();
  const dynamicProductPages = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: product.created_at,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Собираем все URL
  const routes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: getPriority(route),
  }));

  return [...routes, ...dynamicProductPages];
}

// Функция определения приоритета
function getPriority(route: string): number {
  const priorityMap: Record<string, number> = {
    "": 1.0,
    "/about": 0.9,
    "/contacts": 0.9,
    "/bonuses": 0.8,
    "/delivery": 0.7,
    "/policy": 0.3,
  };

  return priorityMap[route] || 0.5;
}

async function getProductsFromDB() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

  try {
    const { data, error } = await supabase
      .from("products") // Замените на название вашей таблицы с продуктами
      .select("id, created_at") // Выбираем нужные поля
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
}
