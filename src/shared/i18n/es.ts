// Every user-facing string lives here. Components never hardcode UI text.
export const es = {
  appName: 'PizarraF7',
  shell: {
    back: 'Volver',
    underConstruction: 'Pantalla en construcción.',
  },
  login: {
    title: 'Entrar',
    enter: 'Entrar',
  },
  teams: {
    title: 'Mis equipos',
    empty: 'Todavía no tienes equipos.',
    exampleTeam: 'Equipo de ejemplo',
  },
  team: {
    title: 'Equipo',
    exampleBoard: 'Jugada de ejemplo',
    exampleLive: 'Sala en vivo de ejemplo',
  },
  editor: {
    title: 'Jugada',
    pitch: 'Cancha',
    tools: 'Herramientas',
    library: 'Categorías y biblioteca',
    properties: 'Propiedades',
  },
  live: {
    title: 'Sala en vivo',
    pitch: 'Cancha',
    actions: 'Acciones del jugador',
  },
  invite: {
    title: 'Invitación',
    join: 'Unirme',
  },
  routeError: {
    title: 'Algo salió mal',
    message: 'No pudimos abrir esta pantalla. Revisa tu conexión y recarga.',
    reload: 'Recargar',
  },
  notFound: {
    title: 'Página no encontrada',
    goHome: 'Ir a mis equipos',
  },
  stylesPreview: {
    title: 'Estilos base',
    intro:
      'Página de prueba: el botón base con los tokens de la dirección C · Analista.',
    variantsTitle: 'Variantes',
    primary: 'Primario',
    secondary: 'Secundario',
    ghost: 'Fantasma',
    statesTitle: 'Estados',
    tool: 'Herramienta',
    disabled: 'Desactivado',
    toolHint: 'Toca la herramienta para activarla o desactivarla.',
    focusHint: 'Con teclado, usa Tab para ver el foco.',
  },
} as const
