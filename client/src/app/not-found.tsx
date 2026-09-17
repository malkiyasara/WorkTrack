import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <h2 className="text-4xl font-bold text-slate-800 mb-4">404 - Not Found</h2>
      <p className="text-slate-600 mb-8">Could not find requested resource</p>
      <Link
        href="/"
        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
