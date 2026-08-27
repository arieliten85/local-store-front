import { ImageResponse } from "next/og";
import { seoConfig } from "@/config/seo.config";
import { siteConfig } from "@/config/site.config";
import { ogTheme } from "@/theme/og-theme";

export const alt = seoConfig.title;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: ogTheme.colors.background,
        color: ogTheme.colors.foreground,
        display: "flex",
        flexDirection: "column",
        fontSize: 64,
        height: "100%",
        justifyContent: "center",
        padding: 80,
        width: "100%",
      }}
    >
      <p style={{ color: ogTheme.colors.accent, fontSize: 28, margin: 0 }}>
        {siteConfig.name}
      </p>
      <h1 style={{ margin: "24px 0 0", textAlign: "center" }}>
        {seoConfig.title}
      </h1>
    </div>,
    size,
  );
}
