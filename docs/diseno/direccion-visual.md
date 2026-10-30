# Dirección visual

> T1.1 cerrada el 2026-10-22 · Decisión D-012 · Tokens: `src/shared/ui/tokens.css`

## Dirección elegida: C · Analista
Interfaz plana y oscura, con filetes de 1 px y esquinas casi rectas. La cancha es verde oscura, con las zonas del analista apenas marcadas. Local = círculo claro relleno; rival = aro naranja.

**Por qué.** Ganó la ponderación con 99,8 puntos contra 50,7 de B · Pizarra magnética:
- Legibilidad al sol (30 %): 29,8 frente a 26,6. La ficha local da 13:1 sobre la cancha (B: 3,3:1).
- Plantel (30 %): fue la opción preferida en la encuesta.
- Claridad (20 %): 20 frente a 17,2. La sombra del paso anterior se distingue mejor (3,4:1 frente a 1,5:1).
- Costo en Konva (20 %): 20 frente a 6,9. No hay sombras en las fichas: 0 desenfoques por cuadro (B: 14) y unos 51 nodos (B: 80).

De B tomamos dos rasgos: paso actual y herramienta activa con relleno sólido, y trazo de ícono de 2,2.

**Lienzo:** https://claude.ai/artifact/RihpiEZc6RntSvZ6q6SgZM. Es privado; para verlo, el dueño lo comparte desde **Share**. La página R3 trae la comparativa completa y R2 las vistas V0–V5.

## Fuentes
Fira Sans 500, 600 y 700 para la interfaz y los títulos. Fira Code 500–700 (variable) para los números de fichas y pasos.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@500..700&family=Fira+Sans:wght@500;600;700&display=swap" rel="stylesheet" />
```

Son 4 archivos woff2 y unos 87,5 KB (subconjunto latin). Esto no cumple `docs/03` ("sistema o una sola fuente variable autoalojada"). La excepción quedó registrada en D-012: en T9.1 se autoalojan y se recortan. Konva dibuja texto en canvas, así que hay que esperar `document.fonts.load('700 15px "Fira Code"')` antes del primer dibujo.

## Balón
Diseño bicolor propio (D-005), dibujado con formas, sin imágenes y sin sombra. Mide `--ball-size` (16 px). En un cuadro de 24:
- Círculo de radio 11 con `--color-text`.
- Cuña `M4.2 4.2C12 8 12 16 19.8 19.8A11 11 0 0 1 4.2 4.2Z` con `--color-text-muted` mezclado al 75 % con `--color-bg`.
- Costura (la misma curva) con trazo de 1,4 y contorno con trazo de 1,6, ambos con `--color-bg`.

## Reglas de uso de los tokens
- Usa solo `var(--…)` de `tokens.css`; nada de colores ni tamaños sueltos. Si falta un valor, se agrega como token.
- Konva no entiende `var()`: un solo módulo lee los valores de `:root` con `getComputedStyle` y los pasa a las formas.
- Contraste: texto ≥ 4,5:1; fichas, líneas y anillos ≥ 3:1. Si cambias un color, vuelve a medir.
- Local = relleno y rival = aro (`--piece-away-border`). Nunca distingas solo por color.
- La ficha se dibuja de `--piece-size` (36 px), pero se toca con `--touch-min` (44 px): `hitFunc` de radio 22.
- Cancha clara (proyector o impresión): usa `--color-pitch-light`, `--color-pitch-line-light` y las variables `*-on-light`. El local de la cancha oscura da 1,1:1 sobre la clara.
- Sin sombras en las fichas. `--piece-shadow` es transparente a propósito; no uses `none`, porque se combina en listas.
- Estados activos (paso actual, herramienta) con relleno sólido, nunca con tinte.
- Movimiento solo con `--duration-*` y `--ease-*`, sin rebotes. Con `prefers-reduced-motion`, las fichas llegan con un fundido de `--duration-reduced`.

## Tailwind y shadcn/ui
> T0.2 · `src/shared/ui/globals.css` · `components.json`

**Cómo se conectan.** `globals.css` importa Tailwind 4 y `tokens.css`. El bloque `@theme inline reference` solo da nombre a los tokens:
- No emite variables: el `:root` de `tokens.css` sigue siendo la única fuente de valores.
- Cada clase lee `var(--token)`.
- `--*: initial` borra la paleta y las escalas de Tailwind: `bg-red-500`, `h-9`, `text-base`, `shadow-md` o `md:p-2` no generan nada.

**Colores.** Los nombres son los de shadcn/ui:

| Clase (`bg-`, `text-`, `border-`…) | Token |
|---|---|
| `background` / `foreground` | `--color-bg` / `--color-text` |
| `card`, `popover` (+ `-foreground`) | `--color-surface` / `--color-text` |
| `primary` / `primary-foreground` | `--color-accent` / `--color-on-accent` |
| `secondary` / `secondary-foreground` | `--color-surface-2` / `--color-text` |
| `muted` / `muted-foreground` | `--color-surface` / `--color-text-muted` |
| `accent` / `accent-foreground` | `--color-accent` / `--color-on-accent` |
| `destructive` | `--color-danger` |
| `border` · `input` · `ring` | `--color-border` · `--color-outline` · `--color-accent` |
| `control` | `--control-bg` |
| `tool-active` / `tool-active-foreground` | `--tool-active-bg` / `--tool-active-fg` |
| `live`, `success`, `warning`, `skeleton`, `scrim`, `selection` | `--color-*` del mismo nombre |

⚠️ En shadcn/ui, `accent` es el fondo suave del hover. Aquí es nuestro cian. Para el hover usa `secondary`.

La cancha y las fichas no tienen clases porque las dibuja Konva.

**Escalas.**

| Clases | Token |
|---|---|
| `p-0`…`p-8`, `gap-*`, `m-*`, `min-h-0`, `inset-*`, `translate-*` | `--space-0`…`--space-8` (`p-1` = 2 px, no 4 px; sin `--space-0`, `min-h-0` o `px-0` no generan CSS) |
| `size-touch`, `min-h-touch`, `min-w-touch` | `--touch-min` |
| `size-icon-sm`, `size-icon-md` | `--icon-sm`, `--icon-md` |
| `text-xs`…`text-2xl` | `--text-*` (`text-sm` = 13 px) |
| `font-ui`, `font-display`, `font-numeric` | `--font-*` |
| `font-regular`, `font-medium`, `font-bold` | `--weight-*`. `--weight-display` no tiene clase: `font-display` es la familia. Para títulos, `font-medium` |
| `rounded-sm`, `-md`, `-lg`, `-pill`, `-control` | `--radius-*` |
| `shadow-control`, `-sheet`, `-header`, `-bar`, `-tool-active` | `--control-ring`, `--shadow-sheet`, `--header-rule`, `--bar-ring`, `--tool-active-ring` |
| `ease-standard`, `-exit`, `-move` | `--ease-*` |
| `focus-visible:focus-ring` | `--focus-ring`, separado `--space-1` |
| `tablet:`, `laptop:` | ≥ 768 px y ≥ 1200 px |

- Los breakpoints son los únicos valores literales del tema, porque las media queries no leen `var()`.
- Las duraciones y la opacidad no tienen clase: usa `duration-(--duration-fast)` y `opacity-(--disabled-opacity)`.
- `transition-*` usa por defecto `--duration-instant` y `--ease-standard`.
- `border`, `outline` y `ring` sin número usan `--border-w`. El color de borde por defecto es `--color-border`.

**Reglas.**
- Usa solo clases del tema o `(--token)`. Tailwind no bloquea los valores sueltos, así que se revisan en el PR:
  - Valores arbitrarios: `p-[13px]`, `bg-[#fff]`.
  - Números directos, que generan CSS aunque no estén en el tema: `duration-300`, `opacity-50`, `border-2`, `ring-2`, `z-10`, `gap-px`.
  - Trampa: `leading-6` toma `--space-6` (12 px de alto de línea). No uses `leading-*` hasta que haya tokens de alto de línea.
- Una clase que no está en el tema no genera CSS y no avisa. Si una clase "no hace nada", busca en estas tablas.
- Si falta un valor:
  1. Agrega el token en `tokens.css`.
  2. Agrega su clave en el `@theme` de `globals.css`.
  3. Si la clave tiene nombre (espaciado, radio, sombra, peso o curva), agrégala también en `src/shared/lib/utils.ts`; si no, `cn()` no resuelve el conflicto.
- Componentes de shadcn/ui: se agregan con `pnpm dlx shadcn@4.22.1 add <nombre>`. Nunca uses `init`, porque reescribe `globals.css` con su paleta. Después:
  - Adapta las clases de Tailwind (`h-9`, `px-4`, `gap-2`…) a los tokens.
  - Cambia `sm:` y `md:` por `tablet:` y `laptop:`: los breakpoints de Tailwind no existen aquí.
  - Cambia `hover:bg-accent` por `hover:bg-secondary`.
  - Cambia los tintes (`bg-primary/90`) por rellenos sólidos.
  - Revisa el diff de `globals.css`: la CLI puede agregar variables.
  - Si la CLI ofrece sobrescribir `button.tsx`, responde que no. Algunos componentes (alert-dialog, calendar, pagination) dependen del botón de shadcn:
    - Importan `buttonVariants` desde `@/shared/ui/button`; aquí está en `button-variants.ts`.
    - Usan variantes que aquí no existen (`outline`, `destructive`, `link`, `size`).
  - `components.json` trae `iconLibrary: "lucide"`, así que la CLI instalará `lucide-react` si un componente usa íconos. Es la librería elegida (D-014), pero usa puntas redondeadas por defecto: usa siempre el envoltorio que aplica `--icon-linecap`, `--icon-linejoin` y `--icon-stroke` (llega en T1.3).
- Modo oscuro: es el único. `<html class="dark">` hace que los `dark:` de shadcn/ui apliquen siempre.
- Botón base: `src/shared/ui/button.tsx`, con las variantes en `button-variants.ts`. La herramienta activa se marca con `aria-pressed`, que aplica el relleno sólido de `--tool-active-*`.

## Pendientes de la Fase 4
1. Cancha clara: aplicar `--color-home-on-light` y `--color-on-home-on-light` en la escena del proyector del lienzo.
2. C-V0 y C-V1…V5 tienen estructura distinta (dock a sangre, pasos "01", Deshacer y Rehacer separados, cancha de 351×569). Decidir en código cuál manda.
3. C-V0 usa px y trazos fijos en el marcado (íconos de 18 a 22 px, trazo de 1,8). En código, usar los tokens (trazo de 2,2).
4. Faltan los estados vacío y error en V0–V5 (solo hay carga en V4 y sin conexión en V5). Atacar y Replegar tienen solo ícono, sin texto.
