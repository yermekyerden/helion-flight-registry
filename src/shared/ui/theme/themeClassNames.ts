export const themeClassNames = {
  page: 'bg-zinc-100 text-zinc-950 dark:bg-neutral-950 dark:text-zinc-100',

  surface: {
    panel:
      'border-zinc-300 bg-white dark:border-neutral-800 dark:bg-neutral-900',
    panelSoft:
      'border-zinc-300 bg-zinc-50 dark:border-neutral-800 dark:bg-neutral-950',
    field: 'bg-zinc-50 dark:bg-neutral-950',
    modal:
      'border-zinc-300 bg-white dark:border-neutral-800 dark:bg-neutral-900',
  },

  border: {
    default: 'border-zinc-300 dark:border-neutral-800',
    strong: 'border-zinc-300 dark:border-neutral-700',
    divider: 'border-zinc-200 dark:border-neutral-800',
  },

  text: {
    primary: 'text-zinc-950 dark:text-zinc-100',
    muted: 'text-zinc-600 dark:text-zinc-400',
    subtle: 'text-zinc-500 dark:text-zinc-500',
    label: 'text-zinc-500 dark:text-zinc-500',
    eyebrow: 'text-amber-700 dark:text-cyan-300',
    danger: 'text-red-600 dark:text-red-400',
  },

  action: {
    primary:
      'bg-amber-600 text-white hover:bg-amber-700 dark:bg-cyan-400 dark:text-neutral-950 dark:hover:bg-cyan-300',
    secondary:
      'border border-zinc-300 hover:border-amber-600 hover:text-amber-700 dark:border-neutral-700 dark:hover:border-cyan-400 dark:hover:text-cyan-300',
  },

  focus: {
    ring: 'focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-neutral-900',
    field:
      'focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30 dark:focus:border-cyan-400 dark:focus:ring-cyan-400/20',
  },

  badge: {
    default:
      'border-amber-300 text-amber-700 dark:border-cyan-500/40 dark:text-cyan-300',
    latest:
      'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300',
  },

  highlight: {
    latest:
      'border-amber-400 shadow-lg shadow-amber-500/10 ring-2 ring-amber-400/30 dark:border-cyan-500/60 dark:ring-cyan-500/20 dark:shadow-cyan-500/10',
  },
} as const;
