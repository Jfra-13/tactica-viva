# 07 · Guía para trabajar con agentes

> Para quien gestiona el proyecto. Documentación oficial de Claude Code: https://code.claude.com/docs/en/overview · Buenas prácticas: https://code.claude.com/docs/en/best-practices

## Quién hace qué
| Rol | Responsable | Tarea |
|---|---|---|
| Producto y decisiones | Tú | Priorizar, decidir (🧑), probar en el celular y aprobar PRs |
| Implementación | Claude Code | Planear e implementar una tarea a la vez |
| Revisión | Subagente `revisor` | Revisar los cambios contra `CLAUDE.md` antes de que los veas |
| Pruebas | Subagente `tester` | Escribir y correr tests E2E |
| Diseño | Claude con artefactos | Dirección visual, prototipo y pantallas |

## Flujo por tarea (siempre el mismo)
1. Elige la siguiente tarea de `docs/06-fases-y-tareas.md` cuyas dependencias estén hechas.
2. Crea la rama: `git checkout -b tarea/T3.3-fichas-arrastrables`.
3. Abre Claude Code en el repo con una sesión limpia (`/clear` si venías de otra tarea).
4. Pega la plantilla de prompt con la tarea.
5. Revisa el plan que propone y corrígelo antes de que escriba código.
6. Deja que implemente. Si se desvía, interrúmpelo y redirígelo.
7. Pide la verificación: tests, lint, typecheck y cómo probarlo.
8. Pide al subagente `revisor` que revise los cambios.
9. Abre el PR, espera los checks y prueba la URL de preview en tu celular.
10. Haz merge y marca la tarea como hecha en el README.

## Plantilla de prompt
```
Tarea: T3.3 — Fichas arrastrables (docs/06-fases-y-tareas.md)

1. Lee CLAUDE.md y las secciones de docs relevantes para esta tarea.
2. Antes de escribir código, proponme un plan corto: archivos que vas a crear
   o modificar, enfoque y riesgos. Espera mi aprobación.
3. Implementa respetando las reglas de CLAUDE.md.
4. Verifica: corre lint, typecheck y test; agrega los tests que pida la tarea.
5. Al terminar dame: resumen de cambios, cómo lo pruebo en el celular
   y qué quedó pendiente o dudoso.

Si algo es ambiguo o contradice la documentación, pregúntame antes de decidir.
```

## Subagentes sugeridos
Se guardan como archivos en `.claude/agents/`. Ejemplo de revisor (`.claude/agents/revisor.md`):
```markdown
---
name: revisor
description: Revisa los cambios de la rama contra CLAUDE.md antes de abrir un PR. Úsalo al terminar cada tarea.
tools: Read, Grep, Glob, Bash
---
Eres el revisor del proyecto. Revisa el diff de la rama actual contra main.
Verifica, en este orden:
1. Cumple los "Listo cuando" de la tarea.
2. Respeta CLAUDE.md: engine puro, comandos, zod, coordenadas normalizadas,
   textos en es.ts, tokens de diseño, reglas de tiempo real y RLS.
3. Rendimiento: nada pesado en el bundle inicial; arrastres sin re-render de React.
4. Tests suficientes y en verde.
Responde con una lista: ❌ bloqueante, ⚠️ mejorable, ✅ correcto. No edites archivos.
```
Más adelante conviene sumar `tester` (escribe y corre E2E con Playwright) y `auditor-rls` (revisa migraciones y políticas). Detalles: https://code.claude.com/docs/en/sub-agents

## Diseño
- T1.1 y T1.2 se trabajan como artefacto de Claude: una página privada que abres en el celular, puedes compartir con tu equipo y se modifica sobre la misma URL hasta aprobarla. No hace falta tener el proyecto creado.
- En cada tarea de pantalla nueva, el agente sigue `docs/09-diseno.md` y el prototipo de `docs/prototipo/` (ambos se crean en la Fase 1).
- `frontend-design` es opcional para explorar más ideas.
- Si no la tienes en Claude Code, búscala en el marketplace oficial de plugins con `/plugin`, o úsala en Claude.ai y lleva los tokens resultantes al repo.

## Reglas de oro
- **Una tarea por sesión.** Las sesiones largas mezclan contextos y empeoran el resultado.
- **Plan antes de código.** Revisar 10 líneas de plan ahorra 300 de código equivocado.
- **Nada entra sin checks verdes** ni sin que lo pruebes en el celular.
- **Las migraciones aplicadas no se tocan:** siempre se crea una nueva.
- **Si falla dos veces, cambia de enfoque:** pide que explique la causa antes de reintentar.
- **Actualiza `CLAUDE.md`** cuando descubras una regla que el agente rompe seguido.

## Cuando algo sale mal
| Situación | Qué hacer |
|---|---|
| Inventa funciones no pedidas | Recuérdale el alcance de la tarea y `02-alcance-mvp.md` |
| Rompe algo que funcionaba | Vuelve al último commit bueno o usa los checkpoints de Claude Code; pide un test que reproduzca el error |
| Se ve genérico o feo | Pide que siga `docs/09-diseno.md`, los tokens y el prototipo aprobado, con una captura de referencia |
| Va lento en el celular | Pide medir primero (perfil de rendimiento) y luego corregir |

## Más adelante: trabajo en paralelo
Cuando domines el flujo, puedes correr dos tareas a la vez en worktrees separados, siempre que no toquen los mismos archivos (por ejemplo, T2.4 y T3.1). Guía: https://code.claude.com/docs/en/worktrees
