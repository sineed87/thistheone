// components/SubscribeForm.tsx
'use client';

import { useState } from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
    }
  };

  return (
    <section className="my-16 p-6 bg-gray-100 rounded-lg shadow-md max-w-xl mx-auto text-center">
      <h3 className="text-2xl font-semibold mb-4">Subscribe to our newsletter</h3>
      <p className="mb-6 text-gray-600">Get the latest posts delivered straight to your inbox.</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 flex-grow"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Subscribe
        </button>
      </form>
      {status === 'success' && <p className="text-green-600 mt-4">Thanks for subscribing!</p>}
      {status === 'error' && <p className="text-red-600 mt-4">Oops! Something went wrong.</p>}
    </section>
  );
}
