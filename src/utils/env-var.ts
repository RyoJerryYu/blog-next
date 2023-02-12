export const SITE_NAME = "Ryo's Blog";

export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://blog.ryojerryyu.xyz"; // it's not a true domain, should be changed
export const BASE_PATH = process.env.NEXT_PUBLIC_SITE_BASE_PATH || "";
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

export const PROD_SITE_URL = "https://blog.ryo-okami.xyz"; // used for SEO allowing recognition
