import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <span className="text-6xl mb-4">🔍</span>
      <h1 className="text-4xl font-bold mb-4 text-primary-500">
        Quiz Not Found
      </h1>
      <p className="text-gray-400 mb-8 max-w-md">
        Sorry, we couldn&apos;t find the quiz you&apos;re looking for. It may
        have been removed or the URL might be incorrect.
      </p>
      <Link href="/" className="btn-brutal bg-primary-500 text-white">
        ← Back to Home
      </Link>
    </main>
  );
}
