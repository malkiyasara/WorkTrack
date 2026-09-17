import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  LayoutDashboard,
  Users,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-purple-500 via-purple-400 to-indigo-600 text-white font-sans overflow-hidden relative selection:bg-amber-400 selection:text-purple-950">
      <div className="absolute top-8 right-10 opacity-20 pointer-events-none hidden sm:grid grid-cols-4 gap-2">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-white rounded-sm"></div>
        ))}
      </div>

      <div className="absolute bottom-6 left-10 w-24 h-24 border border-white/20 rounded-lg transform -rotate-12 pointer-events-none hidden sm:block">
        <div className="absolute top-2 left-2 w-full h-full border border-white/10 rounded-lg"></div>
      </div>

      <div className="absolute top-1/3 -right-12 w-48 h-48 border-[16px] border-white/10 rounded-full pointer-events-none hidden md:block" />

      <style>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-card-float { animation: floatCard 4s ease-in-out infinite; }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Top Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-10 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white font-black text-base shadow-md">
            T
          </div>
          <span className="text-2xl font-black tracking-tight text-white drop-shadow-sm">
            WorkTrack
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2 rounded-full border border-white/40 text-xs font-semibold text-white hover:bg-white/15 transition-all duration-200 backdrop-blur-sm"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all duration-200"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-12 pb-16 text-center animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold backdrop-blur-md shadow-sm">
            <Sparkles size={14} className="text-amber-300" />
            <span>Smart Task Management Terminal</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-sm">
            Manage Your Tasks.
            <span className="block mt-2 text-amber-300 drop-shadow-md">
              Get Things Done.
            </span>
          </h1>

          <p className="mt-6 text-purple-100/90 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
            Organize your daily workflows, track real-time productivity, and
            stay focused with a simple, high-performance task management system.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <Link
              href="/register"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-xl shadow-purple-900/10 transition-all duration-200 active:scale-95"
            >
              <span>Start Managing Tasks</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/50 text-white font-semibold text-xs hover:bg-white hover:text-purple-700 transition-all duration-200 backdrop-blur-sm"
            >
              Sign In to Terminal
            </Link>
          </div>
        </div>
      </section>

      {/* Main Features Container */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 pb-20 animate-card-float">
        <div className="bg-purple-600 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-bl-full pointer-events-none"></div>

          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/15 hover:-translate-y-1">
              <div className="w-11 h-11 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center mb-4">
                <LayoutDashboard className="text-amber-300" size={22} />
              </div>

              <h3 className="text-lg font-bold mb-2 tracking-tight">
                Simple Dashboard
              </h3>

              <p className="text-purple-00 text-xs leading-relaxed">
                Get a clear, real-time overview of all your tasks and active
                productivity metrics from one terminal.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/15 hover:-translate-y-1">
              <div className="w-11 h-11 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center mb-4">
                <CheckCircle className="text-amber-300" size={22} />
              </div>

              <h3 className="text-lg font-bold mb-2 tracking-tight">
                Track Your Tasks
              </h3>

              <p className="text-purple-100 text-xs leading-relaxed">
                Create, tag, organize, and complete items effortlessly while
                maintaining complete historical logs.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/15 hover:-translate-y-1">
              <div className="w-11 h-11 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center mb-4">
                <Users className="text-amber-300" size={22} />
              </div>

              <h3 className="text-lg font-bold mb-2 tracking-tight">
                Stay Organized
              </h3>

              <p className="text-purple-100 text-xs leading-relaxed">
                Keep your workspace neat with instant categorization, user
                routing, and clear operational clarity.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap justify-center items-center gap-8 text-[11px] text-purple-200 font-semibold tracking-wide uppercase">
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-amber-300" />
              <span>Secure Terminal</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={15} className="text-amber-300" />
              <span>Instant State Synchronization</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
