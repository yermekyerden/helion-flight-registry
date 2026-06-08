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

const style = {
  root: 'pointer-events-none absolute inset-0 z-0 overflow-hidden',
  darkLayer: 'absolute inset-0 hidden dark:block',
  lightLayer: 'absolute inset-0 block dark:hidden',
  lightGlow:
    'absolute -top-32 right-[-8rem] h-96 w-96 rounded-full bg-amber-200/30 blur-3xl',
  lightGlowSecondary:
    'absolute bottom-[-10rem] left-[-6rem] h-96 w-96 rounded-full bg-cyan-100/40 blur-3xl',
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
  vignette:
    'absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_45%,rgb(0_0_0_/_0.34)_100%)]',
} as const;

export function SpaceBackground() {
  return (
    <div aria-hidden="true" className={style.root}>
      <div className={style.lightLayer}>
        <div className={style.lightGlow} />
        <div className={style.lightGlowSecondary} />
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

        <div className={style.vignette} />
      </div>
    </div>
  );
}
