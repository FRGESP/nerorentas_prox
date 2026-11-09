import { SITE_URL } from "@/lib/seo"

export const ASUNTO_CONFIRMACION = "Ya estás en la lista de Nerorentas"

export const TEXTO_CONFIRMACION = `¡Gracias por registrarte!

Estamos por lanzar Nerorentas: tus propiedades, contratos, cobros en línea y reportes en una sola plataforma, con recordatorios de pago por WhatsApp para tus inquilinos.

Muy pronto abrimos y tú serás de los primeros en saberlo. Te escribiremos a este correo en cuanto esté listo.

Si tienes alguna duda, solo responde este correo.

— El equipo de Nerovant
${SITE_URL}`

// Estilos en línea y tablas: es lo único que Gmail y Outlook respetan de forma consistente
export const HTML_CONFIRMACION = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<title>${ASUNTO_CONFIRMACION}</title>
</head>
<body style="margin:0;padding:0;background-color:#0A0A0A;">
<div style="display:none;max-height:0;overflow:hidden;">Muy pronto abrimos y tú serás de los primeros en saberlo.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0A0A0A;">
  <tr>
    <td align="center" style="padding:48px 20px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <tr>
          <td style="padding-bottom:40px;font-size:18px;font-weight:700;letter-spacing:-0.3px;color:#ffffff;">Nerorentas</td>
        </tr>
        <tr>
          <td style="padding-bottom:20px;">
            <span style="display:inline-block;padding:6px 12px;border:1px solid rgba(255,255,255,0.12);border-radius:999px;background-color:#161616;font-size:12px;font-weight:600;color:#d1d5db;">
              <span style="color:#34d399;">&#9679;</span>&nbsp; Muy pronto
            </span>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom:16px;font-size:30px;line-height:1.15;font-weight:500;letter-spacing:-0.8px;color:#ffffff;">Ya estás en la lista.</td>
        </tr>
        <tr>
          <td style="padding-bottom:16px;font-size:16px;line-height:1.6;color:#d1d5db;">
            Gracias por registrarte. Estamos por lanzar Nerorentas: tus propiedades, contratos, cobros en línea y reportes en una sola plataforma, con recordatorios de pago por WhatsApp para tus inquilinos.
          </td>
        </tr>
        <tr>
          <td style="padding-bottom:32px;font-size:16px;line-height:1.6;color:#d1d5db;">
            Muy pronto abrimos y tú serás de los primeros en saberlo. Te escribiremos a este correo en cuanto esté listo.
          </td>
        </tr>
        <tr>
          <td style="padding-bottom:48px;">
            <a href="${SITE_URL}" style="display:inline-block;padding:14px 24px;border-radius:999px;background-color:#ffffff;color:#000000;font-size:14px;font-weight:600;text-decoration:none;">Visitar nerorentas.com</a>
          </td>
        </tr>
        <tr>
          <td style="padding-top:24px;border-top:1px solid rgba(255,255,255,0.1);font-size:13px;line-height:1.6;color:#9ca3af;">
            ¿Dudas? Solo responde este correo.<br>
            © ${new Date().getFullYear()} Nerovant. Ingeniería de precisión. Excelencia monumental.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`
