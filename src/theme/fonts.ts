import { Inter, Playfair_Display } from "next/font/google";

export const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading-family",
  display: "swap",
});

export const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body-family",
  display: "swap",
});
