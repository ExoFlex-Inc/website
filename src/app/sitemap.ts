import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

/* Language lives in a cookie, not the URL, so each route is one entry — there
   is no /en tree to enumerate and hreflang does not apply. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<[path: string, priority: number]> = [
    ["/", 1],
    ["/team", 0.8],
    ["/contact", 0.8],
    ["/confidentialite", 0.3],
    ["/conditions", 0.3],
    ["/privacy", 0.3],
    ["/terms", 0.3],
  ]
  return routes.map(([path, priority]) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: priority > 0.5 ? "monthly" : "yearly",
    priority,
  }))
}
