export const themeClassNames = {
  page: 'bg-zinc-100 text-zinc-950 dark:bg-neutral-950 dark:text-zinc-100',

  surface: {
    panel:
      'border-zinc-300 bg-white dark:border-neutral-800 dark:bg-neutral-900',
    panelSoft:
      'border-zinc-300 bg-zinc-50 dark:border-neutral-800 dark:bg-neutral-950',
    field:
      'border-zinc-300 bg-white text-zinc-950 placeholder:text-zinc-400 dark:border-neutral-700 dark:bg-neutral-950 dark:text-zinc-100 dark:placeholder:text-neutral-500',
    fieldSoft: 'bg-zinc-50 dark:bg-neutral-950',
    modal:
      'border-zinc-300 bg-white dark:border-neutral-800 dark:bg-neutral-900',
    notice:
      'border-zinc-300 bg-zinc-50 dark:border-neutral-800 dark:bg-neutral-950',
    noticeAccent:
      'border-amber-300 bg-amber-50 dark:border-cyan-500/40 dark:bg-cyan-500/10',
  },

  border: {
    default: 'border-zinc-300 dark:border-neutral-800',
    strong: 'border-zinc-300 dark:border-neutral-700',
    divider: 'border-zinc-200 dark:border-neutral-800',
  },

  text: {
    primary: 'text-zinc-950 dark:text-zinc-100',
    muted: 'text-zinc-600 dark:text-zinc-400',
    subtle: 'text-zinc-500 dark:text-neutral-500',
    label: 'text-zinc-900 dark:text-zinc-100',
    eyebrow: 'text-amber-700 dark:text-cyan-300',
    danger: 'text-red-600 dark:text-red-400',
  },

  action: {
    primary:
      'bg-amber-600 text-white hover:bg-amber-700 dark:bg-cyan-400 dark:text-neutral-950 dark:hover:bg-cyan-300',
    secondary:
      'border border-zinc-300 text-zinc-800 hover:border-amber-600 hover:text-amber-700 dark:border-neutral-700 dark:text-zinc-200 dark:hover:border-cyan-400 dark:hover:text-cyan-300',
  },

  focus: {
    ring: 'focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-neutral-950',
    field:
      'focus-visible:border-amber-600 focus-visible:ring-2 focus-visible:ring-amber-500/30 focus-visible:outline-none dark:focus-visible:border-cyan-400 dark:focus-visible:ring-cyan-400/20',
    checkbox:
      'focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-neutral-950',
  },

  badge: {
    warning:
      'border-amber-300 text-amber-700 dark:border-cyan-500/40 dark:text-cyan-300',
    latest:
      'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300',
  },

  status: {
    idle: 'border-zinc-300 text-zinc-500 dark:border-neutral-700 dark:text-neutral-500',
    warning:
      'border-amber-300 text-amber-700 dark:border-cyan-500/40 dark:text-cyan-300',
    success:
      'border-emerald-300 text-emerald-700 dark:border-emerald-500/40 dark:text-emerald-300',
  },

  indicator: {
    pending:
      'border-zinc-300 text-zinc-400 dark:border-neutral-700 dark:text-neutral-500',
    success:
      'border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
  },

  highlight: {
    latest:
      'border-amber-400 shadow-lg shadow-amber-500/10 ring-2 ring-amber-400/40 dark:border-cyan-500/60 dark:ring-cyan-500/20 dark:shadow-cyan-500/10',
  },
} as const;
