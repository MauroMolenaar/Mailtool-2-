'use client';

import { useState } from 'react';

export default function Home() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Bezig met versturen...');

    const response = await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify({ to, subject, message }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.success) {
      setStatus('✅ E-mail succesvol verzonden!');
      setTo('');
      setSubject('');
      setMessage('');
    } else {
      setStatus('❌ Er ging iets mis bij het versturen.');
    }
  }

  return (
    <main style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h1>📨 Verstuur een e-mail</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ontvanger"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />
        <input
          type="text"
          placeholder="Onderwerp"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />
        <textarea
          placeholder="Bericht"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />
        <button type="submit">Verstuur</button>
      </form>
      <p>{status}</p>
    </main>
  );
}
