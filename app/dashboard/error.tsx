'use client';

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Er ging iets mis</h1>
      <p>{error.message}</p>
    </div>
  );
}
