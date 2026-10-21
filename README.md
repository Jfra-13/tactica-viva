# PizarraF7 (nombre provisional)

Pizarra táctica colaborativa en tiempo real para fútbol amateur. El DT arma alineaciones y jugadas animadas, y su plantel las ve en vivo desde el celular.

**MVP:** fútbol 7 (F7). F5 y F11 en fases posteriores.

## Problema
Los equipos amateur explican tácticas con lapicero y una pizarra que se borra. No queda registro, no todos ven lo mismo y fuera de la cancha no hay cómo explicarlo.

## Propuesta
- **Sala en vivo:** el DT mueve, dibuja y reproduce jugadas; todos lo ven al instante.
- **Jugadas por pasos** con balón animado.
- **Biblioteca** de alineaciones y jugadas estándar F7, editables y aplicables al rival.
- **Participación con permiso:** los jugadores garabatean o proponen su movimiento.
- **Rivales reactivos:** presionan el balón o marcan a un jugador.

## Documentación
| Archivo | Para qué sirve |
|---|---|
| [CLAUDE.md](CLAUDE.md) | Reglas que siguen los agentes al programar |
| [docs/01-investigacion.md](docs/01-investigacion.md) | Competencia y oportunidad |
| [docs/02-alcance-mvp.md](docs/02-alcance-mvp.md) | Qué entra y qué no; roles y permisos |
| [docs/03-arquitectura.md](docs/03-arquitectura.md) | Stack, datos, tiempo real y rendimiento |
| [docs/04-ui-ux.md](docs/04-ui-ux.md) | Pantallas, layouts, interacción y estilo |
| [docs/05-biblioteca-f7.md](docs/05-biblioteca-f7.md) | Alineaciones y jugadas predeterminadas |
| [docs/06-fases-y-tareas.md](docs/06-fases-y-tareas.md) | Plan de desarrollo en tareas para agentes |
| [docs/07-guia-agentes.md](docs/07-guia-agentes.md) | Cómo gestionar a los agentes paso a paso |
| [docs/08-decisiones.md](docs/08-decisiones.md) | Decisiones tomadas y su motivo; no se reabren sin consultar |

## Stack
React + TypeScript (Vite) · react-konva · Zustand · TanStack Query · Tailwind + shadcn/ui · zod · Supabase (Auth, Postgres, Realtime) · Cloudflare · PWA

## Arranque rápido (disponible tras la Fase 0)
```bash
pnpm install
cp .env.example .env.local   # completar claves de Supabase
pnpm dev
```

## Estado
- [x] Análisis y documentación
- [ ] Fase 0 — Cimientos
- [ ] Fase 1 — Diseño y shell
- [ ] Fase 2 — Cuentas, equipos y plantel
- [ ] Fase 3 — Pizarra estática
- [ ] Fase 4 — Pasos, balón y animación
- [ ] Fase 5 — Sala en vivo
- [ ] Fase 6 — Dibujo y sugerencias
- [ ] Fase 7 — Biblioteca F7
- [ ] Fase 8 — Rivales reactivos
- [ ] Fase 9 — Pulido y piloto
