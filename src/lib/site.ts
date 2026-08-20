/** Canonical origin, shared by metadataBase, robots.txt, sitemap.xml and the
 *  Organization JSON-LD so a domain change happens in one place. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.exoflex.ca"
