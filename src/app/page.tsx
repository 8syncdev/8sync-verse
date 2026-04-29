export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="max-w-4xl space-y-6">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">
          8 Sync Verse
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
          Build the next learning and AI agent universe.
        </h1>
        <p className="text-lg leading-8 text-slate-300 sm:text-xl">
          A multi-platform ecosystem for education, collaboration, and intelligent
          assistants — crafted for web, mobile, and desktop.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <a
            className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            href="/design"
          >
            Explore Design System
          </a>
          <a
            className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            href="https://8syncdev.com"
          >
            Visit 8Sync
          </a>
        </div>
      </div>
    </main>
  );
}
