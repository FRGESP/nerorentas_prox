import { NextResponse } from "next/server"
import type { RowDataPacket } from "mysql2/promise"
import { pool } from "@/lib/db"

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

  try {
    const [resultados] = await pool.query<RowDataPacket[][]>("CALL SP_AÑADIR_LISTA(?)", [correo])
    const yaEstaba = Number(resultados[0][0].RES) === 1
    return NextResponse.json({ estado: yaEstaba ? "ya-registrado" : "registrado" })
  } catch (error) {
    console.error("Error al registrar en la lista de espera:", error)
    return NextResponse.json({ error: "No pudimos registrar tu correo. Intenta de nuevo en un momento." }, { status: 500 })
  }
}
