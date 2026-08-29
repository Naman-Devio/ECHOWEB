'use client';

export default function Error({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-orange-50">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-red-500">!</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4">Something went wrong</h2>
        <p className="text-gray-600 mt-2 text-lg">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-block mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
