import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const TITULO = "Nerorentas | Muy pronto";
const DESCRIPCION =
  "Nerorentas llega muy pronto: el software para administrar tus propiedades en renta. Cobra en línea, controla contratos, genera reportes y envía recordatorios de pago por WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL("https://nerorentas.com"),
  title: TITULO,
  description: DESCRIPCION,
  applicationName: "Nerorentas",
  authors: [{ name: "Nerovant" }],
  creator: "Nerovant",
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Nerorentas",
    title: TITULO,
    description: DESCRIPCION,
  },
  twitter: { card: "summary", title: TITULO, description: DESCRIPCION },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
