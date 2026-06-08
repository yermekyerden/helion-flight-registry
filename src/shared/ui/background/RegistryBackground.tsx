import { cn } from '@/shared/lib/class-name/cn';

const darkStarClassNames = [
  'left-[6%] top-[12%] h-1 w-1 bg-cyan-200/70',
  'left-[14%] top-[32%] h-0.5 w-0.5 bg-white/60',
  'left-[22%] top-[18%] h-0.5 w-0.5 bg-violet-200/60',
  'left-[28%] top-[74%] h-1 w-1 bg-cyan-200/50',
  'left-[36%] top-[10%] h-0.5 w-0.5 bg-white/60',
  'left-[44%] top-[42%] h-0.5 w-0.5 bg-cyan-100/70',
  'left-[52%] top-[20%] h-1 w-1 bg-white/50',
  'left-[58%] top-[82%] h-0.5 w-0.5 bg-violet-200/60',
  'left-[67%] top-[34%] h-0.5 w-0.5 bg-cyan-100/70',
  'left-[74%] top-[14%] h-1 w-1 bg-white/50',
  'left-[82%] top-[62%] h-0.5 w-0.5 bg-cyan-200/60',
  'left-[91%] top-[26%] h-0.5 w-0.5 bg-white/50',
] as const;

const faintStarClassNames = [
  'left-[10%] top-[58%]',
  'left-[18%] top-[84%]',
  'left-[31%] top-[54%]',
  'left-[39%] top-[88%]',
  'left-[47%] top-[66%]',
  'left-[63%] top-[8%]',
  'left-[70%] top-[78%]',
  'left-[86%] top-[44%]',
  'left-[94%] top-[88%]',
] as const;

const registryLineClassNames = [
  'left-[8%] top-[18%] w-40 rotate-[-12deg] bg-amber-300/20',
  'right-[12%] top-[30%] w-56 rotate-[8deg] bg-cyan-300/20',
  'left-[18%] bottom-[22%] w-64 rotate-[5deg] bg-zinc-300/45',
  'right-[22%] bottom-[14%] w-44 rotate-[-10deg] bg-amber-300/20',
] as const;

const documentPanelClassNames = [
  'left-[-7rem] top-24 h-72 w-96 rotate-[-8deg]',
  'right-[-8rem] top-48 h-80 w-[28rem] rotate-[10deg]',
  'bottom-[-7rem] left-[18%] h-72 w-[34rem] rotate-[3deg]',
] as const;

const style = {
  root: 'pointer-events-none absolute inset-0 z-0 overflow-hidden',

  lightLayer: 'absolute inset-0 block dark:hidden',
  lightBase:
    'absolute inset-0 bg-gradient-to-b from-zinc-100 via-zinc-100 to-zinc-200',
  lightGrid:
    'absolute inset-0 opacity-[0.36] [background-image:linear-gradient(to_right,rgb(212_212_216_/_0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgb(212_212_216_/_0.55)_1px,transparent_1px)] [background-size:48px_48px]',
  lightFineGrid:
    'absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgb(245_158_11_/_0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgb(34_211_238_/_0.22)_1px,transparent_1px)] [background-size:192px_192px]',
  lightGlowAmber:
    'absolute -top-36 right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-amber-200/35 blur-3xl',
  lightGlowCyan:
    'absolute bottom-[-12rem] left-[-8rem] h-[30rem] w-[30rem] rounded-full bg-cyan-100/55 blur-3xl',
  lightGlowNeutral:
    'absolute left-[34%] top-[22%] h-72 w-72 rounded-full bg-white/40 blur-3xl',
  documentPanel:
    'absolute rounded-[2rem] border border-zinc-300/50 bg-white/35 shadow-sm',
  registryLine: 'absolute h-px rounded-full',
  stamp:
    'absolute right-[12%] top-[12%] h-36 w-36 rounded-full border border-amber-300/25',
  stampInner:
    'absolute right-[calc(12%+1.75rem)] top-[calc(12%+1.75rem)] h-20 w-20 rounded-full border border-cyan-300/25',
  lightVignette:
    'absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_58%,rgb(228_228_231_/_0.55)_100%)]',

  darkLayer: 'absolute inset-0 hidden dark:block',
  deepSpace:
    'absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-950 to-black',
  topNebula:
    'absolute -top-32 left-[-6rem] h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl',
  sideNebula:
    'absolute right-[-10rem] top-[20%] h-[32rem] w-[32rem] rounded-full bg-violet-500/10 blur-3xl',
  lowerNebula:
    'absolute bottom-[-12rem] left-[25%] h-[30rem] w-[30rem] rounded-full bg-emerald-400/5 blur-3xl',
  orbitalRing:
    'absolute right-[-12rem] top-20 h-[34rem] w-[34rem] rounded-full border border-cyan-400/10',
  orbitalRingInner:
    'absolute right-[-8rem] top-32 h-[24rem] w-[24rem] rounded-full border border-violet-300/10',
  horizonLine:
    'absolute left-[-10%] top-[34%] h-px w-[120%] rotate-[-6deg] bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent',
  secondaryLine:
    'absolute right-[-12%] top-[66%] h-px w-[70%] rotate-[10deg] bg-gradient-to-r from-transparent via-violet-300/10 to-transparent',
  star: 'absolute rounded-full shadow-sm',
  faintStar: 'absolute h-0.5 w-0.5 rounded-full bg-white/25',
  darkVignette:
    'absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_45%,rgb(0_0_0_/_0.34)_100%)]',
} as const;

export function RegistryBackground() {
  return (
    <div aria-hidden="true" className={style.root}>
      <div className={style.lightLayer}>
        <div className={style.lightBase} />
        <div className={style.lightGlowAmber} />
        <div className={style.lightGlowCyan} />
        <div className={style.lightGlowNeutral} />

        {documentPanelClassNames.map((className) => (
          <div className={cn(style.documentPanel, className)} key={className} />
        ))}

        <div className={style.lightGrid} />
        <div className={style.lightFineGrid} />

        {registryLineClassNames.map((className) => (
          <div className={cn(style.registryLine, className)} key={className} />
        ))}

        <div className={style.stamp} />
        <div className={style.stampInner} />
        <div className={style.lightVignette} />
      </div>

      <div className={style.darkLayer}>
        <div className={style.deepSpace} />
        <div className={style.topNebula} />
        <div className={style.sideNebula} />
        <div className={style.lowerNebula} />

        <div className={style.orbitalRing} />
        <div className={style.orbitalRingInner} />

        <div className={style.horizonLine} />
        <div className={style.secondaryLine} />

        {darkStarClassNames.map((className) => (
          <span className={cn(style.star, className)} key={className} />
        ))}

        {faintStarClassNames.map((className) => (
          <span className={cn(style.faintStar, className)} key={className} />
        ))}

        <div className={style.darkVignette} />
      </div>
    </div>
  );
}
