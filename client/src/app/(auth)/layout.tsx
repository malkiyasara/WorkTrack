import AuthCarousel from "@/components/auth/AuthCarousel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-purple-400 via-purple-300 to-indigo-500 items-center justify-center p-4 font-sans overflow-hidden relative">
      <div className="absolute top-8 right-10 opacity-20 pointer-events-none hidden sm:grid grid-cols-4 gap-2">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-white rounded-sm"></div>
        ))}
      </div>

      <div className="absolute bottom-6 left-10 w-24 h-24 border border-white/20 rounded-lg transform -rotate-12 pointer-events-none hidden sm:block">
        <div className="absolute top-2 left-2 w-full h-full border border-white/10 rounded-lg"></div>
      </div>

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

      <div className="animate-fade-in-up flex w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl min-h-[530px] max-h-[630px] relative z-10">
        <div className="absolute -bottom-10 -left-10 w-24 h-24 border-[12px] border-purple-600 rounded-full opacity-10 pointer-events-none hidden md:block" />
        
        <AuthCarousel />

        <div className="w-full md:w-1/2 bg-purple-600 text-white p-6 md:p-10 flex flex-col justify-center relative">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full pointer-events-none"></div>
          <div className="w-full max-w-xs mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
