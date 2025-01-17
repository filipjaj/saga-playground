export const API_URLS = {
  production: "https://tvguide.vg.no/backend/api",
  beta: "https://tvguide-beta.vg.no/backend/api",
} as const;

export type APIEnvironment = keyof typeof API_URLS;
