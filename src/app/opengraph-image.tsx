import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Nerorentas — Muy pronto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public/assets/NerovantLogo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F6F5F1",
          padding: 72,
          color: "#000",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={77} height={42} alt="" />
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>Nerorentas</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 120, fontWeight: 800, lineHeight: 1, letterSpacing: -5 }}>
            Próximamente
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#374151" }}>
            Pagos en línea, contratos, reportes y recordatorios por WhatsApp.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 600 }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: "#10b981" }} />
          nerorentas.com
        </div>
      </div>
    ),
    size
  );
}
