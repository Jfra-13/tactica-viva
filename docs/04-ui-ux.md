# 04 · UI/UX

## Principios
1. **Cero curva de aprendizaje:** si el DT necesita un tutorial para su primera jugada, el diseño falló.
2. **El pulgar manda:** herramientas abajo; lo destructivo arriba y con confirmación.
3. **Un modo a la vez:** Mover o Dibujar, nunca ambos; el modo activo siempre visible.
4. **Respuesta inmediata:** todo toque se nota en menos de 100 ms (visual y, en Android, vibración corta).
5. **Cada rol ve lo suyo:** el DT tiene herramientas; el jugador, una vista limpia.
6. **La cancha es la protagonista:** la interfaz ocupa lo mínimo y se esconde cuando no se usa.

## Dispositivos
| Rol | Prioridad | Comportamiento |
|---|---|---|
| DT / Co-DT | Tablet y laptop, totalmente usable en celular | Paneles laterales en pantallas grandes; hojas inferiores en el celular |
| Jugador | Celular | Vista simple: ver, seguir al DT y sugerir con permiso |

Breakpoints: móvil < 768 px · tablet 768–1199 px · laptop ≥ 1200 px. En el celular, la cancha va vertical.

## Mapa de pantallas
1. **Entrar:** Google o correo.
2. **Mis equipos:** tarjetas con color, nombre, mi rol y aviso "🔴 En vivo" si hay sala activa.
3. **Equipo:** pestañas Jugadas (por categoría y carpeta) · Plantel · Ajustes (nombre, color, rival por defecto, balón).
4. **Editor de jugada** (DT y co-DT).
5. **Sala en vivo** (vista del jugador).
6. **Biblioteca:** hoja con plantillas filtrables y vista previa.
7. **Aceptar invitación:** equipo, quién invita y botón "Unirme".

## Editor (DT) en el celular
```
┌──────────────────────────────────┐
│ ←  Ataque por banda   ↶ ↷   🔴 5 │  título, deshacer/rehacer, en vivo
├──────────────────────────────────┤
│                                  │
│           CANCHA F7              │
│           (vertical)             │
│                                  │
├──────────────────────────────────┤
│ ▶  [1] [2] [3] [+]     ⬆  ⬇      │  pasos, reproducir, Atacar/Replegar
├──────────────────────────────────┤
│ ✋Mover ✏️Dibujar 📚Biblio 👥Fichas ⋯ │  máximo 5 herramientas
└──────────────────────────────────┘
```
- Tocar una ficha la selecciona y abre una hoja inferior: nombre, número, avatar, balón y, si es rival, su regla.
- Arrastrar una ficha la mueve en el paso actual; queda la sombra del paso anterior con una flecha.
- Mantener presionado abre un menú rápido: dar balón, pasar a…, quitar del campo.
- ✏️ Dibujar muestra una mini barra: libre, flecha, zona, color y borrar.

## Editor (DT) en tablet y laptop
- Panel izquierdo: categorías, carpetas y biblioteca.
- Centro: cancha (horizontal en laptop si hay espacio; vertical en tablet en retrato).
- Panel derecho: propiedades de lo seleccionado y, en vivo, participantes con sus permisos.
- Abajo: línea de tiempo de pasos con duración editable.
- Atajos en laptop: `Espacio` reproducir · `Ctrl+Z` deshacer · `1–9` ir al paso · `D` dibujar · `V` mover.

## Sala en vivo (jugador) en el celular
```
┌──────────────────────────────────┐
│ Los Halcones · 👁 Siguiendo al DT │
├──────────────────────────────────┤
│                                  │
│           CANCHA F7              │
│                                  │
├──────────────────────────────────┤
│ Paso 2 de 3 · ▶ lo controla el DT │
├──────────────────────────────────┤
│    ✋ Levantar mano    ✏️    ↔️     │  ✏️ y ↔️ solo con permiso
└──────────────────────────────────┘
```
- La ficha propia se resalta con un anillo para encontrarse al instante.
- Si revisa un paso por su cuenta, aparece "Volver a seguir al DT".
- Al recibir un permiso, un aviso breve: "El DT te dio permiso para dibujar".

## Sugerencias
- La propuesta de movimiento se ve como una sombra con borde punteado del color del jugador y su nombre.
- El DT ve una tarjeta "Juan propone moverse aquí" con ✓ Aceptar y ✕ Descartar.
- Los garabatos de cada jugador usan su color; el DT puede borrarlos todos con un botón.

## Sistema visual
- **Cancha:** verde oscuro con líneas de alto contraste; opción clara para proyectar.
- **Fichas:** local = círculo relleno con número; rival = círculo con contorno grueso; nombre corto debajo; diámetro mínimo de 36 px en el celular.
- **Avatar:** punto de color o emoji dentro de la ficha, con el número pequeño en una esquina.
- **Estados:** seleccionada (anillo blanco y leve aumento), sombra del paso anterior (40 % de opacidad), propuesta (borde punteado).
- **Balón:** diseños originales; nunca réplicas de balones oficiales.
- **Tokens:** colores, tipografía, radios, espaciado y sombras en `src/shared/ui/tokens.css`, definidos en la Fase 1 a partir del prototipo aprobado (T1.1 a T1.3).

## Estados y retroalimentación
- Indicador de conexión: verde (en línea), ámbar (reconectando), rojo (sin conexión, solo lectura).
- Carga con esqueletos, nunca pantallas en blanco.
- Estados vacíos con una acción: "Aún no tienes jugadas · Elegir de la biblioteca".
- Errores en lenguaje simple, con una acción para resolverlos.
- "Guardado" discreto junto al título; nunca bloquea al usuario.

## Primer uso
1. Crear equipo: nombre y color.
2. Plantel: escribir o pegar la lista de nombres.
3. Invitar: QR y botón "Compartir por WhatsApp".
4. Abrir la biblioteca con la alineación 2-3-1 ya sugerida.

## Accesibilidad
- Contraste AA en textos y fichas.
- No depender solo del color: forma distinta para local y rival, nombres visibles.
- Etiquetas accesibles en todos los botones de iconos.
- Con `prefers-reduced-motion` se reducen las transiciones de la interfaz; la animación de jugadas se mantiene porque es el contenido.

## Textos
Español neutro y futbolero, frases cortas: "Jugada", "Paso", "Atacar", "Replegar", "Dar balón", "Seguir al DT", "Levantar mano". Todos en `src/shared/i18n/es.ts`.
