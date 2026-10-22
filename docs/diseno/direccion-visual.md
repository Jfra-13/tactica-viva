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

## Pendientes de la Fase 4
1. Cancha clara: aplicar `--color-home-on-light` y `--color-on-home-on-light` en la escena del proyector del lienzo.
2. C-V0 y C-V1…V5 tienen estructura distinta (dock a sangre, pasos "01", Deshacer y Rehacer separados, cancha de 351×569). Decidir en código cuál manda.
3. C-V0 usa px y trazos fijos en el marcado (íconos de 18 a 22 px, trazo de 1,8). En código, usar los tokens (trazo de 2,2).
4. Faltan los estados vacío y error en V0–V5 (solo hay carga en V4 y sin conexión en V5). Atacar y Replegar tienen solo ícono, sin texto.
