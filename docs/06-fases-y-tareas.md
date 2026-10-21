# 06 · Fases y tareas

## Cómo leer este documento
- **Para ti (gestor):** cada fase tiene un objetivo y una lista "✅ Tú verificas". No pases a la siguiente fase sin completarla.
- **Para los agentes:** cada tarea es pequeña y autocontenida:
  - **Hacer:** qué construir.
  - **Listo cuando:** criterio de aceptación verificable.
  - **Depende de:** tareas previas.
- Una tarea = una rama = un PR. Usa la plantilla de `07-guia-agentes.md`.
- 🧑 = requiere una acción o decisión tuya.

| Fase | Nombre | Resultado |
|---|---|---|
| 0 | Cimientos | Repo, calidad, CI y despliegue |
| 1 | Diseño y shell | Identidad visual y navegación |
| 2 | Cuentas, equipos y plantel | Login, equipos, invitaciones y roles |
| 3 | Pizarra estática | Cancha, fichas y guardado |
| 4 | Pasos, balón y animación | Jugadas animadas |
| 5 | Sala en vivo | Tiempo real con el plantel |
| 6 | Dibujo y sugerencias | Participación con permisos |
| 7 | Biblioteca F7 | Plantillas listas para usar |
| 8 | Rivales reactivos | Presión y marca automáticas |
| 9 | Pulido y piloto | Rendimiento, exportar y prueba real |

---

## Fase 0 — Cimientos
Objetivo: un proyecto vacío pero profesional, que se prueba y se despliega solo.

**T0.1 — Crear el proyecto**
- Hacer: Vite + React + TypeScript estricto, pnpm, ESLint + Prettier, alias `@/`, estructura de `03-arquitectura.md`, `es.ts` vacío.
- Listo cuando: `pnpm dev`, `build`, `lint` y `typecheck` funcionan sin errores.
- Depende de: —

**T0.2 — Estilos y componentes base**
- Hacer: Tailwind + shadcn/ui; `tokens.css` provisional; modo oscuro por defecto.
- Listo cuando: una página de prueba muestra un botón con los tokens.
- Depende de: T0.1

**T0.3 — Testing**
- Hacer: Vitest + Testing Library + Playwright, con un test de ejemplo cada uno.
- Listo cuando: `pnpm test` y `pnpm test:e2e` pasan en local.
- Depende de: T0.1

**T0.4 — Supabase** 🧑
- Tú: creas dos proyectos gratuitos (dev y prod) y guardas las claves.
- Hacer: Supabase CLI local, carpeta de migraciones, cliente tipado, `.env.example`, scripts `db:reset` y `db:types`.
- Listo cuando: la app consulta la sesión de Supabase sin errores.
- Depende de: T0.1

**T0.5 — CI y keep-alive**
- Hacer: GitHub Actions con lint, typecheck y test en cada PR; workflow programado cada 3 días que consulta el proyecto de producción.
- Listo cuando: un PR de prueba muestra los checks en verde.
- Depende de: T0.3, T0.4

**T0.6 — Despliegue** 🧑
- Tú: conectas el repo a Cloudflare.
- Hacer: configuración de build, URL de preview por PR y variables de entorno.
- Listo cuando: cada PR genera una URL que abre en el celular.
- Depende de: T0.1

✅ **Tú verificas:** abres la URL de preview en tu celular y ves los checks verdes en GitHub.

---

## Fase 1 — Diseño y shell
Objetivo: la app tiene identidad propia y se navega bien en celular, tablet y laptop.

**T1.1 — Dirección visual** 🧑
- Hacer: con la skill frontend-design, proponer 2 direcciones visuales (paleta, tipografía, fichas y cancha) como mockups estáticos.
- Listo cuando: eliges una y queda plasmada en `tokens.css`.
- Depende de: T0.2

**T1.2 — Shell responsive**
- Hacer: rutas (entrar, mis equipos, equipo, editor, sala, invitación); barra inferior en móvil y paneles en tablet y laptop.
- Listo cuando: se navega entre pantallas vacías a 375, 768 y 1280 px sin saltos.
- Depende de: T1.1

**T1.3 — Componentes base**
- Hacer: IconButton, BottomSheet, Toast, EmptyState, Skeleton, ConnectionBadge y PieceAvatar.
- Listo cuando: una página `/dev/ui` (solo en desarrollo) muestra todos sus estados.
- Depende de: T1.1

**T1.4 — PWA**
- Hacer: manifest, íconos, precache del shell y aviso "Nueva versión disponible".
- Listo cuando: se instala en Android y iPhone y abre sin pantalla en blanco.
- Depende de: T1.2

✅ **Tú verificas:** instalas la app en tu celular y te convence cómo se ve y se siente.

---

## Fase 2 — Cuentas, equipos y plantel
Objetivo: cada persona entra, crea o se une a equipos y tiene su rol.

**T2.1 — Esquema base y seguridad**
- Hacer: migración de profiles, teams, team_members, roster_players y folders; funciones `is_member` e `is_editor`; RLS; trigger del dueño; tests de políticas.
- Listo cuando: los tests prueban que un jugador no puede editar y que nadie puede quitarle el rol al dueño.
- Depende de: T0.4

**T2.2 — Login** 🧑
- Tú: configuras Google OAuth en Google Cloud y en Supabase.
- Hacer: pantalla de entrada con Google y enlace mágico, sesión persistente, cierre de sesión, creación de profile.
- Listo cuando: entras con Google en el celular y sigues dentro al reabrir.
- Depende de: T2.1, T1.2

**T2.3 — Mis equipos**
- Hacer: crear equipo (nombre y color; F7 fijo), listarlos con mi rol, crear las carpetas por categoría automáticamente.
- Listo cuando: creas 2 equipos y ves tu rol de DT en ambos.
- Depende de: T2.2

**T2.4 — Plantel**
- Hacer: agregar, editar y quitar jugadores (nombre, número, punto o emoji, color); pegar una lista de nombres.
- Listo cuando: pegas 10 nombres y se crean 10 fichas editables.
- Depende de: T2.3

**T2.5 — Invitaciones**
- Hacer: tabla invitations; link y QR; compartir con Web Share; pantalla de aceptación; RPC `accept_invitation` que vincula la ficha del plantel.
- Listo cuando: un segundo usuario entra por el link desde otro celular y aparece vinculado a su ficha.
- Depende de: T2.4

**T2.6 — Roles y permisos**
- Hacer: cambiar rol (DT, co-DT, jugador); interruptores "Puede dibujar" y "Puede proponer"; dueño protegido en la interfaz.
- Listo cuando: los cambios persisten y un co-DT no puede tocar al dueño.
- Depende de: T2.5

✅ **Tú verificas:** invitas a 2 compañeros reales, entran y les cambias permisos.

---

## Fase 3 — Pizarra estática
Objetivo: el DT arma y guarda una alineación con su plantel real.

**T3.1 — Documento y comandos**
- Hacer: tipos y esquema zod de `BoardDoc`; comandos; `applyCommand`; tests.
- Listo cuando: los tests cubren cada comando, incluido rechazar documentos inválidos.
- Depende de: T0.3

**T3.2 — Cancha F7**
- Hacer: cancha vertical en Konva, capa estática cacheada, ajuste sin deformar, conversión normalizado ↔ píxeles.
- Listo cuando: la cancha se ve nítida y proporcionada a 375, 768 y 1280 px.
- Depende de: T1.2, T3.1

**T3.3 — Fichas arrastrables**
- Hacer: fichas propias y rivales según `04-ui-ux.md`; seleccionar y arrastrar dentro de la cancha; mover el nodo y confirmar al soltar.
- Listo cuando: el arrastre va a 60 fps en un Android de gama media.
- Depende de: T3.2

**T3.4 — Propiedades de ficha y plantel en cancha**
- Hacer: hoja inferior o panel derecho para editar la ficha; colocar al plantel con una alineación base.
- Listo cuando: el DT pone a sus 7 jugadores en cancha en menos de 30 segundos.
- Depende de: T3.3, T2.4

**T3.5 — Rival genérico**
- Hacer: nombre y color del rival editables; agregar y mover fichas rivales.
- Listo cuando: cambias "Rival" por "Deportivo X" en rojo y se refleja al instante.
- Depende de: T3.3

**T3.6 — Guardar y organizar**
- Hacer: tabla boards con RLS; crear jugada en una carpeta; autoguardado con `version`; lista por categoría y carpeta.
- Listo cuando: cierras la app, vuelves y la jugada está igual.
- Depende de: T3.4, T2.3

**T3.7 — Deshacer y rehacer**
- Hacer: historial de comandos propio de cada editor (máximo 50).
- Listo cuando: deshacer revierte mover, editar y borrar.
- Depende de: T3.1

✅ **Tú verificas:** armas la alineación de tu próximo partido y la encuentras guardada al día siguiente.

---

## Fase 4 — Pasos, balón y animación
Objetivo: las jugadas cobran vida.

**T4.1 — Motor de animación**
- Hacer: `getFrame` puro con suavizado, balón con poseedor y pases; tests.
- Listo cuando: los tests validan posiciones en t = 0, 0,5 y 1 para varios casos.
- Depende de: T3.1

**T4.2 — Línea de tiempo de pasos**
- Hacer: agregar (copia el paso actual), duplicar, borrar, reordenar y duración por paso.
- Listo cuando: creas una jugada de 4 pasos y saltas entre ellos.
- Depende de: T4.1, T3.6

**T4.3 — Sombra y flecha**
- Hacer: mostrar en cada paso la posición anterior como sombra y una flecha al destino.
- Listo cuando: se entiende el recorrido sin reproducir.
- Depende de: T4.2

**T4.4 — Balón**
- Hacer: dar balón, pasar a otro jugador en el paso actual, balón suelto; diseños originales seleccionables.
- Listo cuando: una jugada muestra un pase y una conducción.
- Depende de: T4.2

**T4.5 — Reproductor**
- Hacer: play, pausa, paso a paso, velocidad 0,5x / 1x / 2x; animación fuera de React.
- Listo cuando: reproduce a 60 fps en el celular.
- Depende de: T4.1, T4.4

**T4.6 — Atacar y Replegar**
- Hacer: comando `block.shift` y botones ⬆ ⬇ que crean un paso con el bloque desplazado.
- Listo cuando: con un toque avanza todo el equipo de forma coherente (el arquero se mueve la mitad).
- Depende de: T4.2

✅ **Tú verificas:** recreas una jugada que ya usa tu equipo y tus compañeros la reconocen.

---

## Fase 5 — Sala en vivo
Objetivo: el diferencial del producto. Todos ven lo mismo, al mismo tiempo.

**T5.1 — Canales y autorización**
- Hacer: canales privados `board:` y `team:` con políticas de autorización.
- Listo cuando: un test prueba que un usuario ajeno al equipo no puede unirse.
- Depende de: T2.1

**T5.2 — Comandos en vivo**
- Hacer: emitir y recibir `cmd`; `drag` limitado a ~12 por segundo con interpolación en el receptor; validación del rol del autor.
- Listo cuando: el movimiento del DT se ve fluido en otro celular con menos de 300 ms de retraso.
- Depende de: T5.1, T3.3

**T5.3 — Sincronizar al entrar y reconectar**
- Hacer: `sync:request` / `sync:state`; el anfitrión guarda; reconexión automática con estado visible.
- Listo cuando: un jugador que entra tarde o pierde señal ve exactamente lo mismo que el DT.
- Depende de: T5.2

**T5.4 — Presencia y mano levantada**
- Hacer: lista de conectados con su rol; levantar y bajar la mano; indicador de conexión.
- Listo cuando: el DT ve quién está y quién pidió la palabra.
- Depende de: T5.1

**T5.5 — Reproducción sincronizada y Seguir al DT**
- Hacer: evento `playback`; evento `follow` con jugada y paso actual; botón "Volver a seguir".
- Listo cuando: el DT da play y todos ven la animación al mismo tiempo.
- Depende de: T5.2, T4.5

**T5.6 — Iniciar y terminar la sala**
- Hacer: tabla live_sessions; aviso "El DT está en vivo" en Mis equipos con entrada en un toque.
- Listo cuando: el jugador entra a la sala en 3 toques o menos.
- Depende de: T5.4

**T5.7 — Pruebas E2E multiusuario**
- Hacer: test de Playwright con DT y 2 jugadores: mover, reproducir y reconectar.
- Listo cuando: el test pasa en CI y el PR incluye los mensajes por segundo medidos en el Realtime Inspector.
- Depende de: T5.2 a T5.6

✅ **Tú verificas:** haces una reunión real por Meet o WhatsApp con 5 o más compañeros usando la sala.

---

## Fase 6 — Dibujo y sugerencias
Objetivo: los jugadores participan, siempre con permiso.

**T6.1 — Herramientas de dibujo**
- Hacer: trazo libre, flecha y zona; colores; borrar uno o todos; capa por autor; puntos simplificados al enviar.
- Listo cuando: los dibujos del DT aparecen en todos los celulares al terminar cada trazo.
- Depende de: T5.2

**T6.2 — Permisos aplicados**
- Hacer: herramientas visibles solo con permiso; validación al recibir; aviso al ganar o perder un permiso.
- Listo cuando: los comandos de un jugador sin permiso se ignoran aunque fuerce el cliente.
- Depende de: T6.1, T2.6

**T6.3 — Proponer movimiento**
- Hacer: el jugador arrastra su ficha y genera una sombra de propuesta; el DT la acepta (se convierte en comando) o la descarta.
- Listo cuando: una propuesta aceptada queda en la jugada y deshacer la revierte.
- Depende de: T6.2

**T6.4 — Panel de participantes**
- Hacer: en vivo, interruptores de permisos por jugador y botón "Borrar todos los garabatos".
- Listo cuando: el DT da y quita permisos sin salir de la sala.
- Depende de: T6.2, T5.4

✅ **Tú verificas:** un compañero propone un movimiento, lo aceptas y todos lo ven.

---

## Fase 7 — Biblioteca F7
Objetivo: preparar un partido sin empezar de cero.

**T7.1 — Estructura de plantillas**
- Hacer: tabla templates con RLS de solo lectura; script de seed que valida los JSON con zod.
- Listo cuando: `db:reset` carga las plantillas sin errores.
- Depende de: T3.1

**T7.2 — Contenido** 🧑
- Hacer: crear los JSON de `05-biblioteca-f7.md`.
- Listo cuando: cada plantilla se reproduce bien y tú validas que tenga sentido táctico.
- Depende de: T7.1, T4.4

**T7.3 — Pantalla de biblioteca**
- Hacer: filtros por categoría, vista previa que se anima al tocarla y botón "Usar".
- Listo cuando: encuentras y usas una plantilla en menos de 3 toques.
- Depende de: T7.1

**T7.4 — Aplicar a mi equipo o al rival**
- Hacer: comando `template.apply` con opción espejo; aplicar una alineación conservando los nombres del plantel.
- Listo cuando: aplicas "Desborde por banda" al rival y queda atacando hacia tu arco.
- Depende de: T7.3

✅ **Tú verificas:** preparas un partido completo usando solo plantillas modificadas.

---

## Fase 8 — Rivales reactivos
Objetivo: el rival "piensa" lo suficiente para enseñar a defender.

**T8.1 — Reglas en el motor**
- Hacer: `press_ball` y `mark` con intensidad y distancia máxima dentro de `getFrame`; tests.
- Listo cuando: los tests muestran a un rival acercándose al balón tras un pase a la banda.
- Depende de: T4.1

**T8.2 — Interfaz de reglas**
- Hacer: en la hoja del rival, elegir regla, objetivo e intensidad; línea punteada del rival al jugador marcado.
- Listo cuando: configuras una presión en 4 toques o menos.
- Depende de: T8.1, T3.5

**T8.3 — Reglas en plantillas**
- Hacer: añadir las reglas sugeridas a D4 y D5.
- Listo cuando: esas plantillas muestran la reacción al reproducirlas.
- Depende de: T8.2, T7.2

✅ **Tú verificas:** tu equipo entiende la basculación viendo cómo reaccionan los rivales.

---

## Fase 9 — Pulido y piloto
Objetivo: listo para usarse de verdad en el campeonato.

**T9.1 — Rendimiento**
- Hacer: medir con Lighthouse móvil y un analizador de bundle; corregir hasta cumplir los presupuestos de `03-arquitectura.md`.
- Listo cuando: todos los presupuestos están en verde y documentados en el PR.

**T9.2 — Exportar imagen**
- Hacer: imagen del paso actual con el nombre del equipo; compartir con Web Share.
- Listo cuando: la imagen llega nítida al grupo de WhatsApp.

**T9.3 — Primer uso y estados**
- Hacer: onboarding de 4 pasos; estados vacío, error y sin conexión en todas las pantallas; revisión de textos.
- Listo cuando: alguien nuevo crea un equipo, invita y arma una jugada sin ayuda.

**T9.4 — Pruebas en dispositivos reales** 🧑
- Hacer: checklist en Android de gama media, iPhone, iPad y laptop; corregir lo encontrado.
- Listo cuando: no quedan errores bloqueantes.

**T9.5 — Piloto** 🧑
- Hacer: guía corta para DTs; formulario externo de feedback; publicación en producción.
- Listo cuando: se cumplen los criterios de éxito de `02-alcance-mvp.md` durante 2 fechas.

✅ **Tú verificas:** los criterios de éxito del piloto.
