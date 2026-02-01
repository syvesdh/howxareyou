import Link from "next/link";
import quizData from "@/config/quiz-data.json";

export default function Home() {
  const themeColor = quizData.meta.theme.primary;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Background gradient effect */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${themeColor}40, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Logo / Header */}
        <div className="mb-8">
          <span className="text-6xl mb-4 block animate-bounce-in">🧪</span>
          <h1 className="text-4xl md:text-5xl font-bold font-display gradient-text mb-4">
            Viral Quiz Engine
          </h1>
          <p className="text-xl text-gray-400">
            Build the next viral hit. Zero boilerplate. Just JSON.
          </p>
        </div>

        {/* Featured Quiz Card */}
        <div
          className="card-brutal p-8 mb-8 bg-gray-800/50 backdrop-blur"
          style={{ borderColor: `${themeColor}50` }}
        >
          <div className="text-left">
            <span className="text-sm uppercase tracking-wider text-gray-500 mb-2 block">
              Featured Quiz
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ color: themeColor }}
            >
              {quizData.meta.title}
            </h2>
            <p className="text-gray-400 mb-6">{quizData.meta.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                📝 {quizData.grading.total_questions} questions
              </span>
              <span className="flex items-center gap-2">⏱️ ~3 min</span>
              <span className="flex items-center gap-2">
                🏆 {quizData.achievements?.length || 0} achievements
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/quiz/${quizData.meta.id}`}
          className="btn-brutal inline-block text-lg text-white glow-hover"
          style={{ backgroundColor: themeColor }}
        >
          Take the Quiz →
        </Link>

        {/* Stats (mock) */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold" style={{ color: themeColor }}>
              1.2K+
            </div>
            <div className="text-sm text-gray-500">Quizzes Taken</div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: themeColor }}>
              92%
            </div>
            <div className="text-sm text-gray-500">Share Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: themeColor }}>
              4.8★
            </div>
            <div className="text-sm text-gray-500">Avg Rating</div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-sm text-gray-600">
          <p>
            Built with Next.js + Supabase •
            <a
              href="https://github.com"
              className="ml-1 hover:text-gray-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
