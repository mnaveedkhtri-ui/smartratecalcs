'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <head>
        <title>SmartRateCalcs | Free Financial &amp; Fee Calculators</title>
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8fafc', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '16px' }}>
        <div style={{ maxWidth: '480px', width: '100%', background: '#ffffff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>SmartRateCalcs</h1>
          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>
            Calculation engine loaded safely. Refresh to continue exploring our 80+ payment fee and tax tools.
          </p>
          <button
            onClick={() => reset()}
            style={{ padding: '10px 20px', borderRadius: '12px', background: '#059669', color: '#ffffff', border: 'none', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
          >
            Reload Engine
          </button>
        </div>
      </body>
    </html>
  );
}
