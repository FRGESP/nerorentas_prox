# Contexto del producto — Nerorentas

Este documento resume **qué es Nerorentas y qué ofrece**, en lenguaje de cliente, para construir páginas de marketing (como la de "Próximamente") sin necesidad de leer el código del sistema.

Fuente: el sistema real en `C:\Users\ferna\Documents\DEV\rentas` (landing `src/components/landing/paginaPrincipal.tsx`, planes `src/lib/planes.ts`, SEO `src/lib/seo.ts` y tabla `SUSCRIPCION` de la base de datos). Datos vigentes a noviembre de 2026.

---

## Marca

| Concepto | Valor |
|---|---|
| Producto | **Nerorentas** |
| Empresa que lo desarrolla | **Nerovant** |
| Dominio | `nerorentas.com` |
| Lema de la empresa (footer) | "Ingeniería de precisión. Excelencia monumental." |
| Idioma | Español de México (`es_MX`), trato de **tú** |
| Logo | `public/assets/NerovantLogo.webp` (se muestra a ~20 px de alto junto al texto "Nerorentas" en `font-bold tracking-tight`) |
| Tipografía | Inter (Google Fonts, `next/font/google`) |

**Tono:** directo, claro y práctico. Frases cortas que hablan del beneficio ("Tus rentas, cobradas y bajo control."). Nada de tecnicismos (no decir "Stripe Connect", "SaaS" o "multi-tenant" al cliente). Prometer orden y control, sin exagerar.

**Mensaje principal (hero actual):**
- Título: *"Tus rentas, cobradas y bajo control."*
- Subtítulo: *"Propiedades, contratos, pagos en línea y reportes en una sola plataforma. Olvida el Excel y los recordatorios a mano."*
- Descripción SEO: *"Nerorentas es el software para administrar tus propiedades en renta: cobra en línea, controla contratos, genera reportes y envía recordatorios de pago por WhatsApp a tus inquilinos."*

---

## Qué es

Una plataforma web para **administrar propiedades en renta**: contratos, cobranza, pagos en línea, reportes y recordatorios por WhatsApp. Funciona desde el navegador del celular o la computadora; nadie instala nada.

### Para quién
| Público | Mensaje |
|---|---|
| Propietarios | Controla tus rentas sin hojas de cálculo dispersas. |
| Inmobiliarias | Administra varias carteras con tu equipo y reportes por propiedad. |
| Administradores | Cobranza ordenada, historial claro y cierres sin sorpresas. |
| Inquilinos | Un portal sencillo para consultar cargos y pagar desde el celular. |

Sirve para cualquier cobro recurrente por contrato: casas, departamentos, locales, bodegas, estacionamientos.

### Roles de usuario
- **Administrador (arrendador):** dueño de la cuenta; gestiona propiedades, contratos, cobros, equipo y reportes.
- **Cajero:** registra pagos en ventanilla.
- **Inquilino:** consulta sus cargos y paga en línea.

---

## Funciones

| Función | Descripción para el cliente |
|---|---|
| Propiedades y unidades | Organiza edificios, locales y departamentos con su estado de ocupación en un solo lugar. |
| Cobros con tarjeta | Tus inquilinos pagan en línea con tarjeta y el dinero llega directo a tu cuenta de banco. |
| Contratos digitales | Genera y consulta contratos, vigencias y rentas sin perseguir papeles. |
| Balance y reportes | Ingresos, cobrado, por cobrar y % de cobranza al instante; exportables a Excel y PDF. |
| Equipo y cajeros | Da acceso a tu equipo con roles y permisos para registrar pagos en ventanilla. |
| Recordatorios por WhatsApp | Avisa automáticamente de cargos nuevos, próximos y vencidos sin escribir un mensaje. |
| Cargos flexibles | Renta fija mensual, servicios variables (luz, agua…) y cargos extra, con fechas de cobro. |
| Portal del inquilino | Pago con tarjeta, historial de movimientos y comprobante inmediato. |

**Cómo funciona (3 pasos):**
1. **Registra tus propiedades** — da de alta inmuebles, unidades e inquilinos en minutos.
2. **Configura tus cargos** — renta fija, servicios variables y cargos extra, con fechas de cobro.
3. **Cobra y da seguimiento** — pagos en línea o en caja, con recordatorios y estado en tiempo real.

---

## Planes (precios en MXN al mes, IVA incluido)

Todos empiezan con **30 días de prueba gratis, sin tarjeta**.

| | Prueba (30 días) | Base | **Profesional** (más popular) | Empresarial |
|---|---|---|---|---|
| Precio | $0 | $299 | $799 | $1,999 |
| Para | Probar todo el sistema | Propietarios que empiezan a crecer | Quien administra varias propiedades con equipo | Inmobiliarias y carteras grandes |
| Propiedades y contratos activos | 25 | 5 | 25 | Ilimitados |
| Empleados | 5 | Sin empleados | 5 | Ilimitados |
| Mensajes de WhatsApp al mes | 100 | 50 | 300 | 1,000 |
| Reportes | Completos | Básicos | Completos | Completos |
| Recordatorios automáticos | Sí | No | Sí | Sí |
| Cierre de servicios (luz, agua…) | Sí | No | Sí | Sí |

> Los precios y límites salen de la base de datos. Si cambian en el sistema, actualiza esta tabla.

---

## Preguntas frecuentes (respuestas oficiales)

- **¿Qué es Nerorentas?** Una plataforma en línea para administrar propiedades en renta: controla contratos, cobra pagos en línea, genera reportes y envía recordatorios de pago por WhatsApp.
- **¿Mis inquilinos necesitan instalar algo?** No. Entran desde el navegador de su celular y pagan en línea.
- **¿Cómo recibo el dinero de las rentas?** Cada arrendador recibe los pagos directamente en su cuenta de banco.
- **¿Puedo dar acceso a mi equipo?** Sí. Puedes agregar empleados y cajeros, cada uno con los permisos que necesita.
- **¿Funciona para cobros que no son renta de casa?** Sí. Locales, bodegas, estacionamientos o cualquier cobro recurrente por contrato.

---

## Cifras que ya usa la landing

- "+$2,000,000 cobrados en lo que va del año"
- "+200 unidades administradas"
- "Pagos disponibles 24/7", "100% en línea", "3 roles de usuario", "0 hojas de cálculo"

> No inventar cifras nuevas. Si se necesitan otras, confirmarlas antes con el dueño del producto.

---

## Lo que viene (página de "Próximamente")

- **Qué se anuncia:** el **lanzamiento de Nerorentas**; la plataforma aún no abre al público.
- **Fecha:** sin fecha comprometida → siempre "**Muy pronto**". No poner fechas ni cuentas regresivas.
- **Tipo de página:** una sola pantalla en **modo oscuro**, centrada en el título "Próximamente" y un **campo de correo** ("Avísame"), seguida de una franja con tipos de inmueble y la línea de tiempo "Un mes con Nerorentas". Sin enlaces a login ni a "Crear cuenta" (el sistema todavía no está abierto).
- **Campo de correo:** guarda los correos en la tabla `Lista_de_Espera` de la base MySQL de rentas, vía `POST /api/lista-espera` → `CALL SP_AÑADIR_LISTA(correo)`. Cada correo se registra una sola vez; si ya estaba, se le dice al visitante. Script de la tabla y el SP: `docs/lista-espera.sql`.
- **Base de datos:** hoy es la de prueba en `localhost`. Para publicar la página en internet, la base tiene que ser accesible desde el servidor donde se aloje (las credenciales van en `.env.local`, que no se sube a git).
- **Sin prueba social inventada:** no poner contadores tipo "4.5k personas registradas" hasta tener números reales.
- **Tiempo verbal:** futuro o presente de intención ("podrás", "recibirá", "estamos por lanzar").
- **Cifras:** no usar las de "Cifras que ya usa la landing" (cobrado, unidades administradas): no encajan con un producto que aún no lanza. Los números de la vista previa del panel son ilustrativos.
- **Redes sociales / contacto:** pendiente. Si se agregan, van en el footer.
