const developmentSiteUrl = "http://localhost:3000";

export const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || undefined;

export const siteUrl =
  publicSiteUrl ??
  (process.env.NODE_ENV === "development" ? developmentSiteUrl : undefined);
