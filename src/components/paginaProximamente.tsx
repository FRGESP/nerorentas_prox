"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, CheckCheck, CreditCard, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const entrada = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

type ResultadoRegistro = "registrado" | "ya-registrado";

function FormularioCorreo() {
  const [correo, setCorreo] = useState("");
  const [trampa, setTrampa] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<ResultadoRegistro | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviando) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
      setError("Ingresa un correo electrónico válido");
      return;
    }
    setError("");
    setEnviando(true);
    try {
      const respuesta = await fetch("/api/lista-espera", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, empresa: trampa }),
      });
      const datos = await respuesta.json().catch(() => ({}));
      if (!respuesta.ok) {
        setError(datos.error ?? "No pudimos registrar tu correo. Intenta de nuevo en un momento.");
        return;
      }
      setResultado(datos.estado === "ya-registrado" ? "ya-registrado" : "registrado");
    } catch {
      setError("No hay conexión. Revisa tu internet e intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  if (resultado) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-md flex items-center justify-center gap-3 rounded-full bg-white/[0.06] border border-white/10 px-5 py-3.5"
      >
        <span className="w-7 h-7 rounded-full bg-emerald-400/15 flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 text-emerald-400" />
        </span>
        <p className="text-sm font-medium text-gray-200">
          {resultado === "ya-registrado"
            ? "Ese correo ya estaba en la lista. Te avisaremos en cuanto abramos."
            : "¡Listo! Te avisaremos en cuanto abramos."}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative mx-auto max-w-md">
      <input
        type="text"
        name="empresa"
        value={trampa}
        onChange={(e) => setTrampa(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div
        className={cn(
          "flex items-center gap-2 rounded-full bg-white/[0.06] border p-1.5 pl-5 transition-all duration-200 focus-within:bg-white/[0.08]",
          error ? "border-red-400/60" : "border-white/10 focus-within:border-white/30"
        )}
      >
        <input
          type="email"
          value={correo}
          onChange={(e) => {
            setCorreo(e.target.value);
            if (error) setError("");
          }}
          placeholder="tucorreo@ejemplo.com"
          aria-label="Correo electrónico"
          aria-invalid={!!error}
          className="flex-1 min-w-0 bg-transparent text-base text-white placeholder:text-gray-500 outline-none"
        />
        <button
          type="submit"
          aria-label="Avisarme"
          disabled={enviando}
          className="cursor-pointer shrink-0 inline-flex items-center gap-2 h-11 px-4 sm:px-5 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 active:scale-95 transition-all disabled:cursor-wait disabled:opacity-70 disabled:active:scale-100"
        >
          <span className="hidden sm:inline">{enviando ? "Enviando" : "Avísame"}</span>
          {enviando ? (
            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </div>
      {error && <p className="mt-2.5 text-sm font-medium text-red-400">{error}</p>}
    </form>
  );
}

function FondoHero() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-svh -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[75%] w-[min(1200px,160vw)] -translate-x-1/2 [background-image:radial-gradient(ellipse_50%_65%_at_50%_0%,rgba(255,255,255,0.13),transparent_70%)]" />

      <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:72px_72px] [background-position:center_center] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_42%,black,transparent)]" />

      <div className="absolute inset-x-0 bottom-0 h-40 [background-image:linear-gradient(to_bottom,transparent,#0A0A0A)]" />

      <Horizonte lado="izquierda" />
      <Horizonte lado="derecha" />
    </div>
  );
}

function ventanas(x: number, y: number, columnas: number, filas: number, ancho: number, alto: number, pasoX: number, pasoY: number) {
  let d = "";
  for (let f = 0; f < filas; f++) {
    for (let c = 0; c < columnas; c++) {
      d += `M${x + c * pasoX} ${y + f * pasoY}h${ancho}v${alto}h${-ancho}Z`;
    }
  }
  return d;
}

interface Edificio {
  contorno: string[];
  detalles?: string;
  encendidas?: [number, number, number, number][];
}

const HORIZONTE: Record<"izquierda" | "derecha", Edificio[]> = {
  izquierda: [
    {
      contorno: ["M20 259V40H110V259", "M35 40V28H95V40", "M65 28V8"],
      detalles: ventanas(30, 55, 4, 9, 10, 14, 20, 22),
      encendidas: [[50, 99, 10, 14], [90, 165, 10, 14]],
    },
    {
      contorno: ["M125 259V110H205V259", "M180 110V96H198V110"],
      detalles: ventanas(137, 126, 3, 5, 12, 16, 22, 26),
      encendidas: [[159, 178, 12, 16]],
    },
    {
      contorno: ["M220 259V190H300V259", "M212 192L260 152L308 192", "M252 259V225H270V259"],
      detalles: "M232 205h14v12h-14Z M280 205h12v12h-12Z",
      encendidas: [[232, 205, 14, 12]],
    },
    {
      contorno: ["M318 259V198H400V259", "M314 214H404L398 226H320Z", "M326 259V234H392V259"],
      detalles: "M336 205H382",
    },
  ],
  derecha: [
    {
      contorno: ["M70 259V200Q120 168 170 200V259", "M100 259V222H140V259"],
      detalles: "M100 230H140M100 238H140M100 246H140",
    },
    {
      contorno: ["M185 259V120H275V259"],
      detalles: ventanas(197, 128, 3, 4, 12, 16, 26, 30) + "M180 150H280M180 180H280M180 210H280M180 240H280",
      encendidas: [[223, 158, 12, 16]],
    },
    {
      contorno: ["M290 259V85H365V259"],
      detalles: "M305 95V259M320 95V259M335 95V259M350 95V259M290 120H365M290 160H365M290 200H365M290 240H365",
    },
    {
      contorno: ["M380 259V30H462V259", "M392 30V18H450V30", "M421 18V0"],
      detalles: ventanas(392, 44, 3, 10, 12, 14, 22, 21),
      encendidas: [[414, 107, 12, 14], [392, 191, 12, 14]],
    },
  ],
};

// Un ciclo completo en segundos: se dibuja, se queda un rato, se borra y espera vacío antes de repetir
const CICLO = 7;

const enCiclo = (delay: number, times: number[]) => ({
  duration: CICLO,
  delay,
  times,
  repeat: Infinity,
  ease: "easeInOut" as const,
});

function Horizonte({ lado }: { lado: "izquierda" | "derecha" }) {
  const reduce = useReducedMotion();
  const edificios = HORIZONTE[lado];
  const orden = lado === "izquierda" ? edificios : [...edificios].reverse();

  return (
    <svg
      viewBox="0 0 480 260"
      className={cn(
        "absolute bottom-0 hidden lg:block w-[max(30vw,min(720px,66svh,calc(50vw_-_240px)))] h-auto text-white/[0.38]",
        lado === "izquierda"
          ? "left-0 [mask-image:linear-gradient(to_right,black_58%,transparent)]"
          : "right-0 [mask-image:linear-gradient(to_left,black_58%,transparent)]"
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinejoin="round"
    >
      {orden.map((edificio, i) => {
        const retraso = 0.3 + i * 0.2;
        return (
          <g key={i}>
            {edificio.contorno.map((d, j) => (
              <motion.path
                key={j}
                d={d}
                vectorEffect="non-scaling-stroke"
                initial={reduce ? false : { pathLength: 0 }}
                animate={reduce ? { pathLength: 1 } : { pathLength: [0, 1, 1, 0, 0] }}
                transition={reduce ? undefined : enCiclo(retraso + j * 0.15, [0, 0.15, 0.7, 0.82, 1])}
              />
            ))}
            {edificio.detalles && (
              <motion.path
                d={edificio.detalles}
                vectorEffect="non-scaling-stroke"
                initial={reduce ? false : { opacity: 0 }}
                animate={reduce ? { opacity: 0.75 } : { opacity: [0, 0, 0.75, 0.75, 0, 0] }}
                transition={reduce ? undefined : enCiclo(retraso, [0, 0.12, 0.2, 0.66, 0.74, 1])}
              />
            )}
            {edificio.encendidas?.map(([x, y, w, h], k) => (
              <motion.rect
                key={k}
                x={x}
                y={y}
                width={w}
                height={h}
                stroke="none"
                className="fill-white/60"
                initial={reduce ? false : { opacity: 0 }}
                animate={reduce ? { opacity: 1 } : { opacity: [0, 0, 1, 0.55, 1, 1, 0, 0] }}
                transition={reduce ? undefined : enCiclo(retraso + k * 0.4, [0, 0.2, 0.23, 0.25, 0.28, 0.62, 0.68, 1])}
              />
            ))}
          </g>
        );
      })}
      <motion.path
        d="M0 259.5H480"
        vectorEffect="non-scaling-stroke"
        initial={reduce ? false : { pathLength: 0 }}
        animate={reduce ? { pathLength: 1 } : { pathLength: [0, 1, 1, 0, 0] }}
        transition={reduce ? undefined : enCiclo(0.3, [0, 0.1, 0.85, 0.97, 1])}
      />
    </svg>
  );
}

function HaloTitulo() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[clamp(8rem,22vw,15rem)] w-[min(60rem,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.09] blur-[90px]"
        animate={reduce ? undefined : { opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

const INMUEBLES = ["Casas", "Departamentos", "Edificios", "Locales", "Bodegas"];

function FranjaInmuebles() {
  const reduce = useReducedMotion();
  const grupo = (oculto: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={oculto || undefined}>
      {INMUEBLES.map((nombre) => (
        <span key={nombre} className="flex items-center">
          <span className="px-6 sm:px-10 text-4xl sm:text-6xl font-medium tracking-[-0.03em] text-white/[0.14] whitespace-nowrap">
            {nombre}
          </span>
          <span className="w-2 h-2 rounded-full bg-white/[0.14]" />
        </span>
      ))}
    </div>
  );

  return (
    <section aria-label="Tipos de inmueble" className="py-10 sm:py-14 border-y border-white/[0.06] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <motion.div
        className="flex w-max"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 45, ease: "linear", repeat: Infinity }}
      >
        {grupo(false)}
        {grupo(true)}
      </motion.div>
    </section>
  );
}

const tarjetaMes = "rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left";

function TarjetaCargo() {
  return (
    <div className={tarjetaMes}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-white">Renta mensual</p>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-2xl bg-blue-400/10 text-blue-300 ring-1 ring-blue-400/20">Pendiente</span>
      </div>
      <p className="mt-0.5 text-xs text-gray-500">Departamento 3B</p>
      <p className="mt-3 text-xl font-semibold tabular-nums text-white">$8,500.00</p>
      <p className="mt-0.5 text-xs text-gray-500">Vence el día 5</p>
    </div>
  );
}

function TarjetaWhatsApp() {
  return (
    <div className={tarjetaMes}>
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
          <MessageCircle className="w-3.5 h-3.5 text-white" />
        </span>
        <p className="text-xs font-semibold text-white">Nerorentas</p>
        <p className="text-[11px] text-gray-500">WhatsApp</p>
      </div>
      <div className="mt-3 rounded-xl rounded-tl-sm bg-emerald-400/10 ring-1 ring-emerald-400/15 px-3 py-2.5 text-xs leading-relaxed text-gray-200">
        Hola, Ana. Tu renta de <span className="tabular-nums">$8,500.00</span> vence el día 5. Puedes pagarla en línea desde tu portal.
        <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-gray-500 tabular-nums">
          9:00 a. m. <CheckCheck className="w-3 h-3 text-sky-400" />
        </span>
      </div>
    </div>
  );
}

function TarjetaPago() {
  return (
    <div className={tarjetaMes}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-white">Pago recibido</p>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-2xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20">Pagado</span>
      </div>
      <p className="mt-3 text-xl font-semibold tabular-nums text-white">$8,500.00</p>
      <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
        <CreditCard className="w-3.5 h-3.5" /> Tarjeta terminación 4242
      </p>
      <p className="mt-1 text-xs text-gray-500">Comprobante enviado al inquilino</p>
    </div>
  );
}

function TarjetaReporte() {
  const barras = [62, 78, 70, 84, 76, 95];
  return (
    <div className={tarjetaMes}>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">% Cobranza</p>
      <p className="mt-1 text-xl font-semibold tabular-nums text-white">95.1%</p>
      <div className="mt-3 flex items-end gap-1.5 h-12">
        {barras.map((alto, i) => (
          <span
            key={i}
            className={cn("flex-1 rounded-t-[4px]", i === barras.length - 1 ? "bg-emerald-400" : "bg-white/15")}
            style={{ height: `${alto}%` }}
          />
        ))}
      </div>
      <p className="mt-2 text-xs text-gray-500">Cobrado y por cobrar, por propiedad</p>
    </div>
  );
}

const PASOS_MES = [
  { dia: "Día 1", titulo: "Se genera el cargo", texto: "La renta aparece en el portal de tu inquilino, con su fecha límite.", Tarjeta: TarjetaCargo },
  { dia: "Día 3", titulo: "Le llega un recordatorio", texto: "Un WhatsApp automático le dice cuánto y cuándo pagar.", Tarjeta: TarjetaWhatsApp },
  { dia: "Día 5", titulo: "Paga con tarjeta", texto: "Desde su celular, y el dinero llega directo a tu cuenta.", Tarjeta: TarjetaPago },
  { dia: "Día 30", titulo: "Tu reporte está listo", texto: "Cuánto cobraste, quién debe y cómo va cada propiedad.", Tarjeta: TarjetaReporte },
];

function UnMesConNerorentas() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Termina cuando el final de la línea llega al 90% de la pantalla: así se completa aunque
  // la página acabe poco después (con "end 0.6" el último paso nunca se alcanzaba)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.9"] });
  // Forma de función para que Framer no delegue la animación a la ViewTimeline nativa
  const avance = useTransform(scrollYProgress, (v) => (reduce ? 1 : Math.min(1, Math.max(0, v))));
  const [activos, setActivos] = useState(0);

  useMotionValueEvent(avance, "change", (v) => {
    const pasos = PASOS_MES.filter((_, i) => v >= i / (PASOS_MES.length - 1) - 0.02).length;
    setActivos(pasos);
  });

  const visibles = reduce ? PASOS_MES.length : activos;

  return (
    <section className="px-5 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl mx-auto text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Un mes con Nerorentas</p>
        <h2 className="mt-4 text-3xl sm:text-5xl font-medium tracking-[-0.03em] text-balance">
          Del cargo al reporte, sin perseguir a nadie.
        </h2>
        <p className="mt-4 text-base font-medium text-gray-500 text-balance">
          Así se verá cada mes de renta: el sistema avisa, cobra y te entrega los números.
        </p>
      </motion.div>

      <div ref={ref} className="relative max-w-6xl mx-auto mt-16 sm:mt-20">
        <div aria-hidden="true" className="hidden lg:block absolute top-[11px] left-[12.5%] right-[12.5%] h-px bg-white/10">
          <motion.div style={{ scaleX: avance }} className="h-full origin-left bg-white/70" />
        </div>
        <div aria-hidden="true" className="lg:hidden absolute left-[11px] top-3 bottom-3 w-px bg-white/10">
          <motion.div style={{ scaleY: avance }} className="h-full w-full origin-top bg-white/70" />
        </div>

        <ol className="grid gap-12 lg:grid-cols-4 lg:gap-6">
          {PASOS_MES.map(({ dia, titulo, texto, Tarjeta }, i) => {
            const activo = i < visibles;
            return (
              <li key={dia} className="relative pl-12 lg:pl-0 lg:pt-14 lg:text-center">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-0 lg:left-1/2 lg:-translate-x-1/2 flex w-[23px] h-[23px] items-center justify-center rounded-full border transition-all duration-500",
                    activo ? "border-white bg-white shadow-[0_0_24px_rgba(255,255,255,0.45)]" : "border-white/20 bg-[#0A0A0A]"
                  )}
                >
                  <span className={cn("w-1.5 h-1.5 rounded-full transition-colors duration-500", activo ? "bg-black" : "bg-white/25")} />
                </span>

                <p className={cn("text-xs font-semibold uppercase tracking-widest transition-colors duration-500", activo ? "text-white" : "text-gray-600")}>
                  {dia}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">{titulo}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500 lg:mx-auto lg:max-w-[16rem]">{texto}</p>

                <motion.div
                  initial={false}
                  animate={activo ? { opacity: 1, y: 0 } : { opacity: 0.25, y: 10 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="mt-5"
                >
                  <Tarjeta />
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function MarcaFinal() {
  return (
    <div aria-hidden="true" className="relative overflow-hidden select-none pointer-events-none [background-image:radial-gradient(ellipse_55%_75%_at_50%_100%,rgba(255,255,255,0.06),transparent_70%)]">
      {/* Se empuja hacia abajo para que el borde de la página corte la parte baja de las letras */}
      <motion.p
        initial={{ opacity: 0, y: "45%" }}
        whileInView={{ opacity: 1, y: "24%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative text-center whitespace-nowrap font-semibold tracking-[-0.06em] leading-[0.8] text-[19.5vw] text-transparent bg-clip-text [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.28),rgba(255,255,255,0.03)_80%)] [filter:drop-shadow(0_0_40px_rgba(255,255,255,0.10))]"
      >
        Nerorentas
      </motion.p>
    </div>
  );
}

export function PaginaProximamente() {
  return (
    <div className="relative isolate min-h-screen bg-[#0A0A0A] text-white overflow-x-clip">
      <FondoHero />

      <header className="absolute inset-x-0 top-0 z-20 h-24 flex items-center justify-center px-5">
        <motion.div {...entrada(0)} className="flex items-center gap-3">
          <Image src="/assets/NerovantLogo.webp" alt="Nerovant" width={64} height={35} className="h-7 sm:h-8 w-auto invert" priority />
          <span className="text-xl sm:text-2xl font-bold tracking-tight">Nerorentas</span>
        </motion.div>
      </header>

      <main>
        <section className="relative isolate min-h-svh flex flex-col items-center justify-center px-5 pt-36 sm:pt-44 pb-16 text-center">
          <div className="relative">
            <HaloTitulo />
            <motion.h1
              {...entrada(0.05)}
              className="text-[clamp(3rem,13vw,9.5rem)] font-medium tracking-[-0.04em] leading-[1.05] pb-[0.08em] text-transparent bg-clip-text [background-image:linear-gradient(to_bottom,#ffffff_35%,rgba(255,255,255,0.55))] [filter:drop-shadow(0_0_30px_rgba(255,255,255,0.28))_drop-shadow(0_0_80px_rgba(255,255,255,0.12))]"
            >
              Próximamente
            </motion.h1>
          </div>

          <motion.p {...entrada(0.1)} className="mt-6 sm:mt-8 text-xl sm:text-2xl font-medium text-gray-300 text-balance">
            Una nueva forma de administrar tus rentas.
          </motion.p>

          <motion.p
            {...entrada(0.18)}
            className="mt-3 mx-auto max-w-lg text-base font-medium text-gray-500 text-balance"
          >
            Cobros en línea, contratos, reportes y recordatorios por WhatsApp en una sola plataforma. Déjanos tu correo y sé de los primeros en usarla.
          </motion.p>

          <motion.div {...entrada(0.26)} className="mt-9">
            <FormularioCorreo />
          </motion.div>

          <motion.p {...entrada(0.32)} className="mt-5 text-sm font-medium text-gray-500">
            30 días de prueba gratis al lanzar · Sin tarjeta
          </motion.p>
        </section>

        <FranjaInmuebles />

        <UnMesConNerorentas />

        <MarcaFinal />
      </main>

      <footer className="max-w-6xl mx-auto px-5 pt-10 pb-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
        <p className="text-sm font-medium text-gray-500">© {new Date().getFullYear()} Nerovant. Ingeniería de precisión. Excelencia monumental.</p>
        <p className="text-sm font-medium text-gray-500">nerorentas.com</p>
      </footer>
    </div>
  );
}
