'use client';

export default function GlobalError({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to bottom right, #f5f5f5, #fff7ed)',
          }}
        >
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <h1 style={{ fontSize: '6rem', fontWeight: 'bold', color: '#ef4444' }}>!</h1>
            <h2
              style={{
                fontSize: '1.875rem',
                fontWeight: 'bold',
                color: '#111827',
                marginTop: '1rem',
              }}
            >
              Something went wrong
            </h2>
            <p style={{ color: '#6b7280', marginTop: '0.5rem', fontSize: '1.125rem' }}>
              An unexpected error occurred.
            </p>
            <button
              onClick={reset}
              style={{
                marginTop: '1.5rem',
                padding: '0.75rem 1.5rem',
                background: '#f97316',
                color: 'white',
                borderRadius: '0.5rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
