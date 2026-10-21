# 03 · Arquitectura y stack

## Stack elegido
| Capa | Elección | Por qué | Contras y mitigación |
|---|---|---|---|
| Frontend | React + TypeScript con Vite (SPA) | Todo está tras el login, no necesitamos SSR; bundle liviano y build rápido | Sin SEO: no importa en el MVP; una landing se hace aparte si hace falta |
| Render de la pizarra | Konva + react-konva | Pensado para tocar y arrastrar, soporta móvil, capas separadas, exporta imagen | Menos potente que WebGL con miles de objetos; tenemos ~15 |
| Estado | Zustand | Simple, rápido, selectores finos | Requiere disciplina: todo cambio pasa por comandos |
| Datos remotos | TanStack Query | Caché y reintentos para listas | Una dependencia más; compensa |
| Estilos y UI | Tailwind CSS + shadcn/ui | Componentes accesibles dentro del repo, sin peso extra | Riesgo de verse genérico: tokens propios definidos con el prototipo de la Fase 1 |
| Validación | zod | Un esquema para tipos y validación | — |
| Trazos | perfect-freehand | Trazos suaves con poco código | — |
| Backend | Supabase (Auth, Postgres, Realtime) | Todo en uno, plan gratuito, RLS para permisos | Límites del plan gratuito y pausa por inactividad (ver abajo) |
| Hosting | Cloudflare (sitio estático) | Gratis, CDN global, preview por PR | Vercel también sirve; revisa sus condiciones si luego monetizas |
| PWA | vite-plugin-pwa | Instalable y con carga instantánea del shell | Cuidar la actualización de caché en cada versión |
| Tests | Vitest + Testing Library + Playwright | Unitarios rápidos y E2E multiusuario | — |

### Alternativas descartadas
- **Next.js:** su fuerte (SSR, SEO) no lo necesitamos; agrega complejidad.
- **PixiJS (WebGL):** más rendimiento bruto, pero sin arrastre ni eventos listos; innecesario para ~15 objetos.
- **SVG/DOM puro:** viable, pero Konva simplifica capas, toques y exportación.
- **Liveblocks / Yjs (CRDT):** ideales para coedición compleja; con pocos editores y autoridad del DT bastan comandos por Supabase Broadcast.
- **Firebase:** similar, pero Postgres + RLS encaja mejor con roles y permisos.

## Estructura del repositorio
```
.
├── CLAUDE.md
├── docs/
├── src/
│   ├── app/                 # rutas, providers, layout
│   ├── features/
│   │   ├── auth/
│   │   ├── teams/           # equipos y carpetas
│   │   ├── roster/          # plantel e invitaciones
│   │   ├── board/
│   │   │   ├── engine/      # lógica pura: tipos, comandos, animación, reglas
│   │   │   ├── canvas/      # componentes react-konva
│   │   │   ├── tools/       # mover, dibujar, pasos
│   │   │   └── store/       # Zustand
│   │   ├── library/         # biblioteca de plantillas
│   │   └── live/            # sala en vivo: canal, presencia, permisos
│   └── shared/
│       ├── ui/              # shadcn/ui + tokens.css
│       ├── lib/             # cliente Supabase, utilidades
│       └── i18n/es.ts       # textos de la interfaz
├── supabase/
│   ├── migrations/
│   ├── tests/               # tests de políticas RLS
│   └── seed/templates/      # biblioteca F7 en JSON
└── tests/e2e/
```

## Modelo de datos
| Tabla | Campos principales | Notas |
|---|---|---|
| profiles | id (= auth.users), display_name, avatar_emoji | Se crea al registrarse |
| teams | id, name, color, format ('F7'), owner_id | owner_id protegido por trigger |
| team_members | team_id, user_id, role ('dt' \| 'codt' \| 'player'), can_draw, can_propose | PK (team_id, user_id) |
| roster_players | id, team_id, name, number, emoji, color, user_id (nullable) | Ficha del plantel; se vincula al aceptar la invitación |
| invitations | id, team_id, token, role, roster_player_id (nullable), expires_at, revoked_at, created_by | Se acepta solo por RPC |
| folders | id, team_id, category, name, sort | category: lineup, attack, defense, set_piece, free |
| boards | id, team_id, folder_id, title, doc (jsonb), version, updated_by, updated_at | Documento completo de la jugada |
| templates | id, format, category, title, description, doc (jsonb), sort | Biblioteca del sistema; solo lectura |
| live_sessions | id, team_id, board_id, host_id, started_at, ended_at | Para el aviso "El DT está en vivo" |

## Documento de jugada (`BoardDoc`)
```jsonc
{
  "schemaVersion": 1,
  "format": "F7",
  "home": { "color": "#1E88E5" },
  "away": { "name": "Rival", "color": "#E53935" },
  "ballSkin": "classic",
  "pieces": [
    { "id": "h1", "side": "home", "rosterPlayerId": null, "label": "Juan", "number": 10,
      "avatar": { "type": "emoji", "value": "⚡" } },
    { "id": "a1", "side": "away", "label": "R1", "number": 1, "avatar": { "type": "dot" } }
  ],
  "steps": [
    {
      "id": "s1",
      "durationMs": 1200,
      "positions": { "h1": { "x": 0.5, "y": 0.6 }, "a1": { "x": 0.5, "y": 0.4 } },
      "ball": { "carrierId": "h1" }   // o { "x": 0.5, "y": 0.5 } si está suelto
    }
  ],
  "rivalRules": [
    { "pieceId": "a1", "type": "press_ball", "intensity": 0.6, "maxDistance": 0.15 },
    { "pieceId": "a2", "type": "mark", "targetId": "h3", "intensity": 0.8 }
  ],
  "drawings": [
    { "id": "d1", "authorId": "uuid", "stepId": null, "tool": "arrow",
      "color": "#FFD600", "points": [0.2, 0.7, 0.4, 0.5] }
  ]
}
```
- El paso 1 son las posiciones iniciales; el paso N guarda las posiciones al final de ese paso.
- Un pase es un paso donde `ball.carrierId` cambia de un jugador a otro.
- Los dibujos con `stepId: null` se ven en todos los pasos.

### Sistema de coordenadas
- `x` de 0 (izquierda) a 1 (derecha); `y` de 0 (arco rival) a 1 (arco propio). Nuestro equipo ataca hacia arriba.
- Proporción de la cancha F7: largo/ancho = 1,5. El render la ajusta a la pantalla sin deformarla.
- En vista horizontal (laptop) solo se rota el render; los datos no cambian.
- Espejo (aplicar plantilla al rival): `x' = 1 − x`, `y' = 1 − y`.

## Comandos (única forma de cambiar una jugada)
`applyCommand(doc, cmd) → doc` es una función pura. El mismo comando se aplica localmente, entra al historial de deshacer y se envía por tiempo real.

Comandos del MVP: `piece.add`, `piece.update`, `piece.move`, `piece.remove`, `step.add`, `step.duplicate`, `step.remove`, `step.reorder`, `step.update`, `ball.set`, `rival.update`, `rule.set`, `rule.remove`, `drawing.add`, `drawing.remove`, `drawing.clear`, `template.apply`, `block.shift`.

## Motor de animación
- `getFrame(doc, stepIndex, t) → { positions, ball }` con `t` entre 0 y 1. Función pura con tests.
- Interpolación con suavizado (ease-in-out) entre el paso anterior y el actual.
- Balón: si cambia el poseedor, viaja del primero al segundo; si no, sigue al poseedor.
- Reglas de rivales, aplicadas después de la interpolación base:
  - `press_ball`: se acerca al balón según `intensity`, sin pasar de `maxDistance`.
  - `mark`: se ubica entre su marca y su arco, más cerca cuanto mayor sea `intensity`.
- `block.shift` (Atacar/Replegar): paso nuevo con las fichas propias desplazadas ±0,12 en `y`; el arquero se mueve la mitad.
- El reproductor usa `requestAnimationFrame` y actualiza solo los nodos de Konva, no React.

## Tiempo real (Supabase Realtime)

### Canales
- `board:{boardId}` (privado): todo lo que pasa en la sala de una jugada.
- `team:{teamId}` (privado): avisos ligeros, como "sala en vivo iniciada".
- Autorización de Realtime por políticas: solo los miembros del equipo pueden unirse.

### Eventos
| Evento | Lo emite | Frecuencia |
|---|---|---|
| `cmd` | Editores; jugadores con permiso solo en su capa | Por acción |
| `drag` | Quien arrastra | ≤ 12 por segundo |
| `playback` (play, pause, seek) | Editores | Por acción |
| `follow` (jugada y paso actual) | Anfitrión | Por cambio |
| `suggest` (propuesta de movimiento) | Jugador con permiso | Por acción |
| `sync:request` / `sync:state` | Quien entra / anfitrión | Al entrar o reconectar |

Presence: `{ userId, role, hand }`. Se actualiza solo al entrar, salir y levantar o bajar la mano, porque el plan limita las llamadas de presencia por cliente.

### Autoridad y sincronización
- El **anfitrión** es el editor que inició la sala. Él guarda en la base de datos: autoguardado cada 3 s si hubo cambios, con `version` para no pisar datos más nuevos.
- Al entrar, se carga la jugada desde la base de datos y se envía `sync:request`; el anfitrión responde con el documento actual.
- Cada cliente valida que el autor de un `cmd` tenga el rol o permiso necesario antes de aplicarlo, usando la lista de miembros cargada de la base de datos.
- Reconexión automática: al volver la conexión se repite la sincronización.
- `drag`: el receptor interpola entre los dos últimos mensajes para verse fluido a 60 fps.

## Rendimiento y ligereza
- Bundle inicial solo con el shell (login, listas, navegación). La pizarra y Konva van en un chunk aparte con lazy loading.
- PWA: el shell queda en caché y abre al instante desde la segunda visita.
- Konva: cancha en capa estática cacheada y sin eventos; fichas en capa interactiva; dibujos en capa propia.
- Arrastre: mover el nodo directamente y confirmar en el store al soltar.
- Tipografía del sistema o una sola fuente variable autoalojada.
- Balones y fichas dibujados con formas, sin imágenes pesadas.

### Presupuestos
| Métrica | Objetivo |
|---|---|
| JS inicial (gzip) | ≤ 150 KB |
| Chunk de pizarra (gzip) | ≤ 200 KB |
| LCP en 4G, Android gama media | < 2,5 s |
| Arrastre y animación | 60 fps |
| Latencia DT → jugador | < 300 ms |

## Seguridad
- RLS en todas las tablas, con funciones auxiliares `is_member(team_id)` e `is_editor(team_id)`.
- Trigger que impide cambiar `owner_id`, quitarle el rol al dueño o expulsarlo.
- Las invitaciones se aceptan solo por RPC (`accept_invitation(token)`), que valida vencimiento y revocación.
- La clave `service_role` nunca llega al frontend.

## Plan gratuito: límites y cómo vivir dentro
| Límite (Free) | Valor | Cómo lo respetamos |
|---|---|---|
| Conexiones simultáneas | 200 | Sobran para varios equipos amateur |
| Mensajes por segundo (proyecto) | 100 | No se transmite animación; arrastres limitados; medir en el Realtime Inspector en la Fase 5 |
| Mensajes de presencia por segundo | 20 | Presencia solo para entrar, salir y mano |
| Tamaño de broadcast | 256 KB | Una jugada pesa pocos KB |
| Base de datos | 500 MB | Las jugadas son JSON pequeños |
| Pausa por inactividad | 7 días | Tarea programada en GitHub Actions que consulta la API cada 3 días |
| Proyectos gratuitos | 2 | Uno para desarrollo y otro para producción |

Correo: el servicio de correo integrado de Supabase tiene un límite de envíos muy bajo. Priorizamos el login con Google; si el enlace mágico se usa mucho, se configura un SMTP gratuito.

Fuentes: https://supabase.com/docs/guides/realtime/limits · https://supabase.com/docs/guides/realtime/quotas

## Entornos
- **Local:** Supabase CLI + `pnpm dev`.
- **Preview:** una URL por PR en Cloudflare, conectada al proyecto Supabase de desarrollo.
- **Producción:** rama `main`, con el proyecto Supabase de producción.
