import { NextResponse } from "next/server"
import { Resend } from "resend"
import { ASUNTO_CONFIRMACION, HTML_CONFIRMACION, TEXTO_CONFIRMACION } from "@/lib/correoConfirmacion"

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const REMITENTE = "Nerorentas <nerovant@contacto.nerovant.com>"
const RESPONDER_A = "nerovantstudio@gmail.com"
const ERROR_GENERAL = "No pudimos registrar tu correo. Intenta de nuevo en un momento."

// Se crea al primer uso: el constructor falla sin API key y `next build` carga este módulo
let resend: Resend | null = null
const SEGMENTO = process.env.RESEND_SEGMENT_ID

// Límite en memoria: basta para un solo servidor y evita que el formulario se use para mandar correos en masa
const LIMITE_POR_HORA = 5
const intentosPorIp = new Map<string, number[]>()

function excedeLimite(ip: string) {
  const ahora = Date.now()
  const recientes = (intentosPorIp.get(ip) ?? []).filter((t) => ahora - t < 60 * 60 * 1000)
  recientes.push(ahora)
  intentosPorIp.set(ip, recientes)
  if (intentosPorIp.size > 5000) intentosPorIp.clear()
  return recientes.length > LIMITE_POR_HORA
}

export async function POST(request: Request) {
  let correo = ""
  let trampa = ""
  try {
    const cuerpo = await request.json()
    correo = typeof cuerpo?.correo === "string" ? cuerpo.correo.trim().toLowerCase() : ""
    trampa = typeof cuerpo?.empresa === "string" ? cuerpo.empresa : ""
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 })
  }

  if (!CORREO_VALIDO.test(correo) || correo.length > 100) {
    return NextResponse.json({ error: "Ingresa un correo electrónico válido" }, { status: 400 })
  }

  // Campo oculto que solo llenan los bots: se responde como éxito sin guardar nada
  if (trampa) return NextResponse.json({ estado: "registrado" })

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "desconocida"
  if (excedeLimite(ip)) {
    return NextResponse.json({ error: "Demasiados intentos. Intenta de nuevo más tarde." }, { status: 429 })
  }

  resend ??= new Resend(process.env.RESEND_API_KEY)
  const existente = await resend.contacts.get({ email: correo })
  if (existente.data) {
    // Puede existir en Resend por otra vía: se asegura que quede en el segmento de la lista
    if (SEGMENTO) await resend.contacts.segments.add({ contactId: existente.data.id, segmentId: SEGMENTO })
    return NextResponse.json({ estado: "ya-registrado" })
  }
  if (existente.error && existente.error.name !== "not_found") {
    console.error("Error al buscar el contacto en Resend:", existente.error)
    return NextResponse.json({ error: ERROR_GENERAL }, { status: 500 })
  }

  const creado = await resend.contacts.create({
    email: correo,
    ...(SEGMENTO && { segments: [{ id: SEGMENTO }] }),
  })
  if (creado.error) {
    console.error("Error al crear el contacto en Resend:", creado.error)
    return NextResponse.json({ error: ERROR_GENERAL }, { status: 500 })
  }

  // Si la confirmación falla, el registro ya quedó guardado: solo se anota el error
  const envio = await resend.emails.send(
    {
      from: REMITENTE,
      to: correo,
      replyTo: RESPONDER_A,
      subject: ASUNTO_CONFIRMACION,
      html: HTML_CONFIRMACION,
      text: TEXTO_CONFIRMACION,
    },
    { idempotencyKey: `confirmacion-lista/${correo}` },
  )
  if (envio.error) console.error("Error al enviar la confirmación:", envio.error)

  return NextResponse.json({ estado: "registrado" })
}
