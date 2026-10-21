# 05 · Biblioteca F7

> Plantillas de partida, pedagógicas y genéricas. Valídalas con tu equipo y ajústalas al reglamento de tu campeonato (por ejemplo, saque de banda con la mano o con el pie).

Coordenadas normalizadas: `x` 0 = izquierda, 1 = derecha; `y` 0 = arco rival, 1 = arco propio. Para el rival se aplica espejo (`1 − x`, `1 − y`).

## Alineaciones (arquero + 6 de campo)
| ID | Formación | Arquero | Defensa | Medio | Ataque | Cuándo usarla |
|---|---|---|---|---|---|---|
| L1 | 2-3-1 | (0.50, 0.94) | (0.33, 0.78) (0.67, 0.78) | (0.18, 0.55) (0.50, 0.58) (0.82, 0.55) | (0.50, 0.32) | Equilibrada; la más común en F7 |
| L2 | 3-2-1 | (0.50, 0.94) | (0.20, 0.76) (0.50, 0.80) (0.80, 0.76) | (0.35, 0.56) (0.65, 0.56) | (0.50, 0.32) | Más segura atrás |
| L3 | 3-1-2 | (0.50, 0.94) | (0.20, 0.76) (0.50, 0.80) (0.80, 0.76) | (0.50, 0.58) | (0.35, 0.34) (0.65, 0.34) | Dos puntas para presionar |
| L4 | 2-1-2-1 (rombo) | (0.50, 0.94) | (0.33, 0.78) (0.67, 0.78) | (0.50, 0.66) (0.20, 0.50) (0.80, 0.50) | (0.50, 0.30) | Control del medio |
| L5 | 2-2-2 | (0.50, 0.94) | (0.33, 0.78) (0.67, 0.78) | (0.33, 0.56) (0.67, 0.56) | (0.35, 0.34) (0.65, 0.34) | Simple de entender |
| L6 | 3-3 | (0.50, 0.94) | (0.20, 0.76) (0.50, 0.80) (0.80, 0.76) | — | (0.20, 0.45) (0.50, 0.42) (0.80, 0.45) | Ofensiva, por oleadas |

## Jugadas de ataque
| ID | Nombre | Pasos (resumen) |
|---|---|---|
| A1 | Desborde por banda y centro | 1) El medio abre al volante de banda · 2) Conduce hasta la línea de fondo; el punta ataca el primer palo y el volante opuesto llega al segundo · 3) Centro atrás |
| A2 | Superposición por banda | 1) El volante de banda conduce hacia adentro · 2) El defensa de ese lado pasa por fuera · 3) Pase al que pasó y centro |
| A3 | Pared por el medio | 1) El medio pasa al punta · 2) Devolución de primera · 3) El medio rompe al espacio y remata |
| A4 | Cambio de orientación | 1) Atraer rivales a un lado · 2) Pase al medio central · 3) Apertura a la banda contraria libre |
| A5 | Contraataque 3 contra 2 | 1) Recuperación y conducción por el centro · 2) Dos apoyos abren por las bandas · 3) Pase al que queda libre |
| A6 | Salida corta desde el arquero | 1) Los defensas se abren a las bandas · 2) El medio baja a recibir · 3) Giro y pase adelante |
| A7 | Salida larga al punta | 1) Pase largo al punta · 2) El punta descarga de espaldas · 3) El medio que llega remata o abre |

## Jugadas de defensa
| ID | Nombre | Pasos (resumen) | Reglas de rival |
|---|---|---|---|
| D1 | Presión alta | 1) El punta orienta la salida rival hacia una banda · 2) Los medios cierran los pases cortos · 3) Robo en banda | — (practicarla aplicando A6 al rival) |
| D2 | Bloque medio | 1) Línea compacta en medio campo · 2) Basculación hacia el balón | — |
| D3 | Bloque bajo y repliegue | 1) Todos detrás del balón · 2) Cerrar el centro y el área | — |
| D4 | Defender ataque por banda | 1) El rival ataca por banda (A1 en espejo) · 2) La línea bascula · 3) Cierre del centro | Punta rival: `mark` a nuestro central |
| D5 | Transición tras pérdida | 1) Pérdida · 2) Presión inmediata de los dos más cercanos · 3) El resto repliega | Rivales cercanos: `press_ball` |

## Pelota parada
| ID | Nombre | Pasos (resumen) |
|---|---|---|
| P1 | Córner al primer palo | 1) Bloqueo en el centro · 2) Desmarque al primer palo · 3) Peinada o remate |
| P2 | Córner corto | 1) Pase corto al que se acerca · 2) Devolución o centro desde mejor ángulo |
| P3 | Córner en contra | 1) Marca mixta: zona en el primer palo + marcas individuales |
| P4 | Tiro libre frontal a favor | 1) Amago del primero · 2) Pase lateral corto · 3) Remate del segundo |
| P5 | Saque de banda | 1) Dos apoyos se ofrecen en corto · 2) Uno rompe en largo |

## Pizarra libre
Plantilla vacía con las fichas en la alineación L1, para explicar algo puntual dibujando.

## Notas para quien implemente
- Cada plantilla es un `BoardDoc` en `supabase/seed/templates/{id}.json`, validado con el esquema zod.
- Las jugadas incluyen fichas rivales en posición coherente (L1 en espejo por defecto).
- Duración por paso por defecto: 1.200 ms.
