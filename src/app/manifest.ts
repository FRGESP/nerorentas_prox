import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: "Software para administrar rentas: pagos, contratos, reportes y recordatorios por WhatsApp.",
    lang: "es-MX",
    start_url: "/",
    display: "standalone",
    theme_color: "#0A0A0A",
    background_color: "#0A0A0A",
    icons: [
      { src: "/icono-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icono-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
