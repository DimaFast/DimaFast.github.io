import type { MetadataRoute } from "next";
import { isIndexable } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(isIndexable ? { sitemap: `${site.url}/sitemap.xml` } : {}),
  };
}
