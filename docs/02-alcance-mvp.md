# 02 · Alcance del MVP

## Objetivo
Validar, con tu equipo y 1 a 3 equipos más del campeonato, que explicar tácticas en una sala en vivo hace que los jugadores entiendan mejor que con la pizarra física. Costo de infraestructura: 0.

## Roles
| Rol | Quién es |
|---|---|
| Dueño | Quien crea el equipo. Siempre es DT. Uno por equipo. |
| DT | Dirige el equipo. |
| Co-DT | Mismos permisos que el DT, excepto eliminar el equipo o quitarle el rol al dueño. |
| Jugador | Integrante del plantel. Ve todo; dibuja o propone solo con permiso. |

Una persona puede tener roles distintos en equipos distintos (DT en uno, jugador en otro).

## Matriz de permisos
| Acción | Dueño | DT / Co-DT | Jugador |
|---|:-:|:-:|:-:|
| Ver jugadas y sala en vivo | ✅ | ✅ | ✅ |
| Crear, editar y borrar jugadas | ✅ | ✅ | ❌ |
| Iniciar sala en vivo y reproducir | ✅ | ✅ | ❌ |
| Gestionar plantel e invitar | ✅ | ✅ | ❌ |
| Cambiar roles | ✅ | ✅ (no al dueño) | ❌ |
| Dar o quitar permisos a jugadores | ✅ | ✅ | ❌ |
| Garabatear | ✅ | ✅ | Con permiso |
| Proponer movimiento de su ficha | — | — | Con permiso |
| Eliminar equipo | ✅ | ❌ | ❌ |

## Funcionalidades del MVP

### Cuenta y equipos
- Login con Google; alternativa con enlace mágico por correo.
- Varios equipos por usuario, cada uno con nombre, color y formato (F7 en el MVP).
- Lista de mis equipos con mi rol en cada uno.

### Plantel e invitaciones
- Jugadores con nombre, número y avatar (punto de color o emoji), aunque aún no tengan cuenta.
- Pegar una lista de nombres (por ejemplo, del grupo de WhatsApp) para crear el plantel de una vez.
- Invitación por link y QR, compartible por WhatsApp; correo opcional.
- Al aceptar, la cuenta del jugador se vincula a su ficha del plantel.

### Pizarra
- Cancha F7 vertical en el celular.
- Fichas propias y rivales: arrastrar, seleccionar y editar.
- Rival genérico con nombre y color editables.
- Balón con diseños originales: clásico, retro, neón, noche y color del equipo.
- Deshacer y rehacer.

### Jugadas por pasos
- Pasos encadenados; en cada paso el DT arrastra las fichas a su destino (sombra + flecha).
- Pases y conducción del balón.
- Botones globales "Atacar" y "Replegar": crean un paso con todo el bloque desplazado.
- Reproductor: play, pausa, paso a paso y velocidad.

### Organización
- Categorías fijas: Alineaciones, Ataque, Defensa, Pelota parada y Pizarra libre.
- Carpetas propias dentro de cada categoría.

### Biblioteca F7
- Alineaciones y jugadas estándar (ver `05-biblioteca-f7.md`).
- Usarlas tal cual, duplicarlas y editarlas, o crear jugadas desde cero.
- Aplicar una plantilla a nuestro equipo o al rival (en espejo).

### Sala en vivo
- El DT inicia la sala; los jugadores reciben un aviso y entran con un toque.
- Todos ven en tiempo real lo que hace el DT; modo "Seguir al DT".
- Lista de conectados y opción de "levantar la mano".

### Dibujo y sugerencias
- Trazo libre, flecha y zona; cada autor tiene su capa y su color.
- Dos permisos independientes por jugador: dibujar y proponer movimiento.
- La propuesta de movimiento aparece como sombra del color del jugador; el DT la acepta o la descarta.

### Rivales reactivos
- Regla por rival: "presionar al balón" o "marcar a jugador X", con intensidad.
- Durante la animación, el rival se mueve según su regla.

### Compartir
- Exportar la pizarra como imagen y compartirla.

## Fuera del MVP
F5 y F11 · 3D · exportar video o GIF · audio o video dentro de la app · chat · estadísticas · entrenamientos y asistencia · IA · modo sin conexión completo · monetización.

## Reglas de negocio
- **RN-01:** cada equipo tiene un único dueño; no se le puede quitar el rol ni expulsar.
- **RN-02:** los permisos de jugador persisten entre sesiones hasta que un DT o co-DT los retire.
- **RN-03:** solo DT y co-DT modifican la capa principal de una jugada.
- **RN-04:** las sugerencias pendientes son temporales; solo las aceptadas pasan a la jugada.
- **RN-05:** una invitación vence (7 días por defecto) y puede revocarse.
- **RN-06:** si dos editores mueven la misma ficha a la vez, gana el último movimiento.
- **RN-07:** el formato del equipo define la cancha, el número de fichas y las plantillas disponibles.

## Historias de usuario clave
- Como DT, quiero elegir una alineación de la biblioteca y ajustarla para preparar el partido en menos de 2 minutos.
- Como DT, quiero armar una jugada de 3 pasos con un pase y reproducirla para que todos la vean al mismo tiempo.
- Como DT, quiero aplicar al rival un "ataque por banda" para practicar cómo defenderlo.
- Como jugador, quiero entrar a la sala con un toque desde el aviso y ver lo que muestra el DT.
- Como jugador con permiso, quiero proponer mi movimiento para que el DT lo evalúe.
- Como co-DT, quiero editar la jugada mientras el DT explica.

## Criterios de éxito del piloto
- El DT crea su primera jugada animada en menos de 5 minutos, sin ayuda.
- Un jugador entra a la sala en vivo en 3 toques o menos desde el link.
- Lo que mueve el DT se ve en los celulares en menos de 300 ms.
- Al menos el 70 % del plantel usa la app en 2 partidos seguidos.
- 0 USD de infraestructura.
