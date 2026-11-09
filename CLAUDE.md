# CLAUDE.md — Página "Próximamente" de Nerorentas

Página de marketing **independiente** del sistema de rentas. Una sola página (landing de "Próximamente"), sin sesiones y sin pagos. Su único acceso a datos es la lista de espera: `src/app/api/lista-espera/route.ts` guarda cada correo como contacto en **Resend** (SDK `resend`, variables `RESEND_API_KEY` y `RESEND_SEGMENT_ID` opcional en `.env.local`) y, solo si es nuevo, le manda la confirmación de `src/lib/correoConfirmacion.ts` desde `nerovant@contacto.nerovant.com` (respuestas a `nerovantstudio@gmail.com`). Límite de 5 intentos por IP por hora, en memoria. Todo el texto de UI va en **español de México**, con trato de **tú**.

- **Qué es el producto, planes, funciones y tono:** leer `docs/contexto-producto.md` antes de escribir cualquier texto.
- **Sistema real (solo consulta):** `C:\Users\ferna\Documents\DEV\rentas`. Si la sesión tiene esa carpeta agregada, se puede leer como referencia (en especial `src/components/landing/paginaPrincipal.tsx`, la landing actual). **Nunca editar archivos allá** desde este proyecto.

---

## Comandos

```bash
npm run dev     # servidor de desarrollo
npm run build   # build de producción
npm run lint    # ESLint
```

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript 5 |
| Estilos | Tailwind CSS 4 |
| Animaciones | Framer Motion (`framer-motion`) |
| Íconos | Lucide React (`lucide-react`) |
| Clases condicionales | `cn()` = clsx + tailwind-merge, en `src/lib/utils.ts` |
| Fuente | Inter (`next/font/google`) |

Dependencias por instalar si aún no están: `npm i framer-motion lucide-react clsx tailwind-merge`.

No agregar librerías de UI pesadas (HeroUI, MUI, shadcn completo) ni de formularios: la página es pequeña y se resuelve con Tailwind + `useState`.

## Estructura

```
src/
├── app/
│   ├── layout.tsx      # <html lang="es">, fuente Inter, metadata SEO
│   ├── page.tsx        # La página de Próximamente
│   └── globals.css     # Tailwind + tokens
├── components/         # Secciones de la página (Hero, Funciones, Registro…)
└── lib/
    └── utils.ts        # cn()
public/
└── assets/NerovantLogo.webp
docs/
└── contexto-producto.md
```

## Convenciones TypeScript

- Componentes en PascalCase con **named export**; props tipadas con una `interface` en el mismo archivo. No usar `React.FC`.
- Uniones de string en vez de `enum`.
- Imports internos con alias `@/`. Sin barrel files (`index.ts`).
- Sin comentarios salvo que el *por qué* no sea obvio.
- Textos de UI siempre en español.

---

## Variante de esta página: modo oscuro

La página de "Próximamente" usa la versión **invertida** del lenguaje de Nerorentas (componente `src/components/paginaProximamente.tsx`):

| Rol | Clase |
|---|---|
| Fondo | `bg-[#0A0A0A]` |
| Texto principal / secundario / muted | `text-white` / `text-gray-300` / `text-gray-400`–`text-gray-500` |
| Superficies y chips | `bg-white/[0.06] border border-white/10` |
| CTA | `bg-white text-black rounded-full hover:bg-gray-200` (el acento negro se invierte a blanco) |
| Único color | `emerald-400` para el punto "en vivo" y la confirmación |
| Título | `font-medium tracking-tight` (más ligero que en el sistema) |
| Logo | `NerovantLogo.webp` con la clase `invert` |

Captura del sistema disponible (hoy sin usar): `public/assets/panel-reportes.png` (2463×1302, vista de Reportes con solo totales, sin nombres de inquilinos). Servirla con `unoptimized`: el optimizador de `next dev` se llegó a colgar con la versión de 1920 px.

La laptop 3D que se abría con el scroll se quitó. Si se vuelve a usar una animación ligada al scroll con `sticky`:
- El contenedor raíz usa `overflow-x-clip`, no `overflow-x-hidden` (este último rompe `position: sticky`).
- Las opacidades ligadas al scroll se calculan con `useTransform(scrollYProgress, (v) => …)` (forma de función). Con la forma de arreglos, Framer las delega a la `ViewTimeline` nativa, que con el `sticky` calcula mal el avance.

Funciones: no usar filas de píldoras con íconos. Las funciones se cuentan en la línea de tiempo "Un mes con Nerorentas" (cargo → WhatsApp → pago → reporte); no repetirlas en otra franja.

Orden de la página: hero "Próximamente" (con edificios en las esquinas) → franja de tipos de inmueble → "Un mes con Nerorentas" → "Nerorentas" gigante (`MarcaFinal`, `19.5vw`), con la parte baja cortada justo sobre la línea del footer → footer.

## Lenguaje de diseño (igual que Nerorentas)

### Filosofía
Minimalista, moderno y monocromático. **El negro es el único acento**; el color solo comunica estado (éxito, error) o detalles puntuales (punto verde "en vivo"). Superficies blancas, bordes y sombras casi invisibles, formas muy redondeadas y jerarquía por peso tipográfico.

### Colores
| Rol | Clase |
|---|---|
| Fondo de página (landing) | `bg-[#F6F5F1]` (blanco cálido) |
| Superficie / tarjetas | `bg-white` |
| Acento / CTA | `bg-black text-white`, hover `hover:bg-gray-900` |
| Texto principal | `text-black` |
| Texto secundario | `text-gray-900` |
| Texto muted | `text-gray-700` (sobre negro: `text-gray-400`) |
| Borde sutil | `border-gray-100`, hover `border-gray-200` (nav: `border-black/5`) |
| Secciones oscuras | `bg-black text-white`, tarjetas `border-white/10 bg-white/[0.04]` |
| Éxito / "en vivo" | `bg-emerald-500` (punto), `bg-emerald-50 text-emerald-700 ring-emerald-100` (chip) |
| Error | `bg-red-50 text-red-700 border-red-200` |

### Bordes redondeados
| Elemento | Radio |
|---|---|
| Botones (todos) | `rounded-full` |
| Tarjetas, secciones destacadas | `rounded-3xl` |
| Chips / badges, alertas | `rounded-2xl` |
| Ícono decorativo en tarjeta | `rounded-xl` |
| Inputs | `rounded-full` (formulario de una línea) o `rounded-2xl` |

### Sombras (valores custom; nunca `shadow-md`/`shadow-lg`)
```
Tarjeta en reposo:  shadow-[0_4px_20px_rgb(0,0,0,0.02)]
Tarjeta en hover:   shadow-[0_8px_30px_rgb(0,0,0,0.05)]
Card destacada:     shadow-[0_8px_30px_rgb(0,0,0,0.04)]
Elemento flotante:  shadow-[0_20px_60px_rgb(0,0,0,0.15)]
Navbar:             shadow-[0_2px_10px_rgb(0,0,0,0.02)]
```

### Tipografía
| Uso | Clases |
|---|---|
| Eyebrow | `text-xs font-semibold uppercase tracking-widest text-gray-700` |
| H1 (hero) | `text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-black text-balance` |
| H2 de sección | `text-3xl sm:text-4xl font-bold tracking-tight text-black` |
| Título de tarjeta | `text-lg font-bold text-black` |
| Párrafo / subtítulo | `text-lg font-medium text-gray-700` (hero) · `text-sm font-medium text-gray-700` (tarjetas) |
| Chip | `text-xs font-semibold px-2.5 py-1 rounded-2xl` |
| Números | siempre `tabular-nums` |

### Componentes de referencia

```tsx
/* Botón primario */
<button className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-900 active:scale-95 transition-all shadow-sm">
  Avísame <ArrowRight className="w-4 h-4" />
</button>

/* Botón secundario */
<button className="cursor-pointer inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-gray-900 bg-white border-2 border-gray-300 rounded-full hover:bg-gray-50 active:scale-95 transition-all">
  Ver funciones
</button>

/* Chip de anuncio sobre el H1 */
<span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-full">
  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
  Nerorentas · Próximamente
</span>

/* Tarjeta de función */
<div className="bg-white border border-gray-100 rounded-3xl p-7 hover:border-gray-200 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)] transition-all duration-300">
  <div className="w-11 h-11 rounded-xl bg-black flex items-center justify-center mb-5">
    <Icono className="w-5 h-5 text-white" />
  </div>
  <h3 className="text-lg font-bold text-black mb-2">Título</h3>
  <p className="text-sm font-medium text-gray-700">Descripción.</p>
</div>

/* Input de correo */
<input
  type="email"
  className="w-full px-5 py-3.5 rounded-full bg-white border-2 border-gray-200 hover:border-gray-400 focus:border-black focus:ring-4 focus:ring-black/10 outline-none transition-all text-base font-medium text-gray-900"
/>

/* Navbar frosted */
<nav className="bg-[#F6F5F1]/80 backdrop-blur-md border-b border-black/5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] fixed top-0 left-0 right-0 z-50">

/* Logo */
<a href="/" className="flex items-center gap-2.5">
  <Image src="/assets/NerovantLogo.webp" alt="Nerovant" width={40} height={22} className="h-5 w-auto" priority />
  <span className="text-base font-bold tracking-tight text-black">Nerorentas</span>
</a>

/* Spinner dentro de botón */
<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
```

Fondo punteado del hero (detalle de la landing actual):
```tsx
<div className="absolute inset-0 -z-10 [background-image:radial-gradient(#DDDAD0_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
```

Footer: logo + `© {año} Nerovant. Ingeniería de precisión. Excelencia monumental.`

### Animaciones
Entrada al hacer scroll con Framer Motion (respetar `useReducedMotion`):
```tsx
const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
}
<motion.div {...fade}>…</motion.div>
```
Micro-interacciones: `transition-all duration-200`, `active:scale-95` en CTAs.

### Responsive
Mobile-first (`sm:`, `md:`, `lg:`). Contenedor `max-w-6xl mx-auto px-5`. Probar a 375 px de ancho: sin scroll horizontal.

---

## Reglas de contenido

- No inventar cifras, precios ni fechas: usar solo lo de `docs/contexto-producto.md`. Si falta algo, preguntar.
- No mencionar tecnología interna al cliente (Stripe, MySQL, Next.js…). Hablar de beneficios.
- SEO: `lang="es"`, `locale: "es_MX"`, título y descripción en español, `og:image` si hay imagen.
