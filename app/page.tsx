'use client';

import { useState } from 'react';

export default function Home() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Verzenden...');

    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, message }),
    });

    const data = await res.json();
    if (data.success) {
      setStatus('✅ Mail verzonden!');
    } else {
      setStatus('❌ Er ging iets mis.');
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>📧 Mail Versturen</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ontvanger"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        /><br /><br />
        <input
          type="text"
          placeholder="Onderwerp"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        /><br /><br />
        <textarea
          placeholder="Bericht"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Verstuur e-mail</button>
      </form>
      <p>{status}</p>
    </main>
  );
}
