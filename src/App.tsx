function App() {
  return (
    <main className="min-h-screen bg-zinc-100 px-6 py-10 text-zinc-950 dark:bg-slate-950 dark:text-zinc-100">
      <section className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="rounded-3xl border border-zinc-300 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold tracking-[0.3em] text-amber-700 uppercase dark:text-amber-400">
            Celestial Transit Authority
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Helion Flight Registry
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-slate-400">
            Internal clearance terminal for pilot identity, origin registry,
            vessel profile, and interstellar sector travel applications.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-zinc-300 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-semibold tracking-[0.25em] text-zinc-500 uppercase dark:text-slate-500">
              Protocol
            </p>
            <p className="mt-3 text-2xl font-semibold">Online</p>
          </article>

          <article className="rounded-2xl border border-zinc-300 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-semibold tracking-[0.25em] text-zinc-500 uppercase dark:text-slate-500">
              Active dossiers
            </p>
            <p className="mt-3 text-2xl font-semibold">0</p>
          </article>

          <article className="rounded-2xl border border-zinc-300 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-semibold tracking-[0.25em] text-zinc-500 uppercase dark:text-slate-500">
              Clearance node
            </p>
            <p className="mt-3 text-2xl font-semibold">Terra-Orbit / 07</p>
          </article>
        </section>
      </section>
    </main>
  );
}

export default App;
