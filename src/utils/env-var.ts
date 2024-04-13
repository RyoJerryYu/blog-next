export const SITE_NAME = "Ryo's Blog";

export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN || "http://localhost:3000";

// no trailing slash
// "" or "/blog-next"
export const BASE_PATH = process.env.NEXT_PUBLIC_SITE_BASE_PATH || "";

// no trailing slash
// https://blog.ryojerryyu.xyz or https://blog.ryojerryyu.xyz/blog-next
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

// used for SEO allowing recognition
export const PROD_SITE_URL = "https://blog.ryo-okami.xyz";
