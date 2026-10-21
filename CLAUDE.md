# CLAUDE.md — Reglas del proyecto PizarraF7

Lee este archivo completo antes de cada tarea.

## Qué estamos construyendo
Pizarra táctica de fútbol 7 en tiempo real. El DT (o co-DT) crea alineaciones y jugadas animadas por pasos; los jugadores las ven en vivo desde el celular y, con permiso, dibujan o proponen movimientos. Prioridad absoluta: UI/UX simple, rápida y fluida en móvil.

## Documentos de referencia (lee solo los que apliquen)
- Tarea a realizar: `docs/06-fases-y-tareas.md`
- Alcance y reglas de negocio: `docs/02-alcance-mvp.md`
- Datos, tiempo real y rendimiento: `docs/03-arquitectura.md`
- Pantallas e interacción: `docs/04-ui-ux.md`
- Contenido de la biblioteca: `docs/05-biblioteca-f7.md`

## Comandos
```bash
pnpm dev          # servidor local
pnpm build        # build de producción
pnpm preview      # sirve el build de producción en local
pnpm lint         # ESLint
pnpm typecheck    # tsc -b (sin emitir archivos)
pnpm format       # Prettier (format:check solo verifica)
pnpm test         # Vitest (unitarios)
pnpm test:e2e     # Playwright
pnpm db:reset     # supabase db reset (local)
pnpm db:types     # regenerar tipos de Supabase
```
Si una tarea crea o cambia un comando, actualiza esta lista.

## Forma de trabajar
1. Lee la tarea y sus criterios "Listo cuando".
2. Propón un plan corto (archivos a tocar, enfoque, riesgos) y espera aprobación.
3. Implementa en pasos pequeños; corre `lint`, `typecheck` y `test` antes de terminar.
4. Si algo es ambiguo o contradice la documentación, pregunta. No inventes alcance.
5. Al terminar, resume: qué hiciste, cómo probarlo en el celular, qué quedó pendiente.

## Estructura
```
src/app/                 rutas, providers, layout
src/features/auth|teams|roster|library|live
src/features/board/engine/   lógica pura (sin React, Konva ni Supabase)
src/features/board/canvas/   componentes react-konva
src/features/board/tools/    mover, dibujar, pasos
src/features/board/store/    Zustand
src/shared/ui/           shadcn/ui + tokens.css
src/shared/lib/          cliente Supabase, utilidades
src/shared/i18n/es.ts    todos los textos de la interfaz
supabase/migrations|tests|seed/templates
tests/e2e/
```

## Reglas de código
- TypeScript estricto. Prohibido `any`; usa `unknown` + validación.
- `board/engine/` es lógica pura y tiene tests para cada función.
- El documento de jugada (`BoardDoc`) solo cambia mediante comandos aplicados con `applyCommand`. El mismo comando se aplica localmente y se envía por tiempo real. Nunca mutes el estado directamente.
- Todo dato que llega de red o de base de datos se valida con zod.
- Coordenadas siempre normalizadas (0 a 1). Nunca guardes píxeles.
- Componentes React pequeños (≈150 líneas máx.); la lógica va en hooks o en `engine/`.
- Código, nombres y comentarios en inglés. Textos de interfaz en español, en `es.ts`.
- No agregues dependencias sin justificarlas en el resumen de la tarea.

## Reglas de UI/UX
- Mobile-first: primero 375 px, luego tablet (≥768) y laptop (≥1200).
- Áreas táctiles de mínimo 44×44 px. Herramientas principales en la barra inferior.
- Máximo 5 herramientas visibles; el resto en "Más".
- Toda acción responde visualmente en menos de 100 ms. Deshacer siempre visible en el editor.
- Usa solo los tokens de `src/shared/ui/tokens.css`; nada de colores o tamaños sueltos.
- No dependas solo del color: local = círculo relleno, rival = círculo con contorno.
- Cada pantalla tiene estados de carga, vacío, error y sin conexión.
- Reutiliza componentes de `src/shared/ui` antes de crear nuevos.

## Reglas de rendimiento
- La pizarra y Konva se cargan con lazy loading; nunca en el bundle inicial.
- Durante un arrastre, mueve el nodo de Konva directamente; escribe en el store al soltar.
- Cancha en capa estática (`listening(false)`, cacheada); fichas y dibujos en capas separadas.
- Selectores finos de Zustand; ningún componente se suscribe a todo el store.
- Presupuestos en `docs/03-arquitectura.md` (sección Rendimiento). Si una tarea los rompe, avisa.

## Reglas de tiempo real
- Nunca transmitas cuadros de animación: se envía `playback` y cada cliente calcula la animación.
- Arrastres en vivo: máximo ~12 mensajes por segundo por usuario; el receptor interpola.
- Trazos: se envían al terminar la línea, con puntos simplificados.
- Canales privados con autorización. Cada cliente verifica el rol del autor antes de aplicar un comando.
- Presence solo para conectados y "mano levantada"; nada de cursores.

## Base de datos (Supabase)
- Cambios de esquema solo con migraciones nuevas. Nunca edites una migración ya aplicada.
- Toda tabla nueva con RLS activado y tests de políticas.
- Regenera tipos con `pnpm db:types` tras cada migración.
- La clave `service_role` nunca va al frontend.

## Testing
- `engine/`: tests unitarios obligatorios.
- Funciones de tiempo real: test E2E con 2 o más contextos de navegador.
- Bugs: primero un test que falle, luego el arreglo.

## Git
- Una tarea = una rama `tarea/T3.3-fichas-arrastrables` = un PR.
- Commits pequeños en español: `tipo(área): descripción` (feat, fix, refactor, test, docs, chore).

## Definición de terminado
- [ ] Cumple todos los "Listo cuando" de la tarea
- [ ] `lint`, `typecheck` y `test` en verde
- [ ] Probado a 375 px y a ≥1200 px
- [ ] Sin textos de interfaz fuera de `es.ts`
- [ ] Documentación actualizada si cambió arquitectura o comandos

## Glosario (interfaz → código)
| Interfaz (es) | Código (en) |
|---|---|
| Jugada | `board` |
| Paso | `step` |
| Ficha | `piece` |
| Plantel / jugador del plantel | `roster` / `rosterPlayer` |
| Equipo propio / rival | `home` / `away` |
| Sala en vivo | `liveSession` |
| Anfitrión | `host` |
| Propuesta de movimiento | `suggestion` |
| Plantilla | `template` |
| Atacar / Replegar | `block.shift` (+ / −) |

Antes de cambiar algo listado en `docs/08-decisiones.md`, pregunta.
