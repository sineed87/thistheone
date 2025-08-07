'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom'; // Fallback for React 18
import { subscribeToNewsletter } from '@/app/actions/newsletter';
import { useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';

export default function SubscribeForm() {
  const [state, formAction] = useActionState(subscribeToNewsletter, {
    success: false,
    message: '',
    status: undefined,
  });

  const [showConfetti, setShowConfetti] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  // Measure container size for Confetti
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (state.success && state.status === 'pending_verification') {
      formRef.current?.reset();
      setShowConfetti(true);
    }
  }, [state]);

  if (state.success && state.status === 'pending_verification') {
    return (
      <div
        ref={containerRef}
        className="relative max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center"
      >
        {showConfetti && (
          <Confetti
            width={dimensions.width}
            height={dimensions.height}
            recycle={false}
            numberOfPieces={300}
          />
        )}
        <h1 className="text-2xl font-bold text-green-600 mb-4">🎉 Subscription Successful!</h1>
        <p className="mb-6 text-gray-700">Check your inbox to verify your email.</p>
        <a
          href="https://www.google.com"
          className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition"
        >
          HOME
        </a>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold text-black text-center mb-4">Subscribe to Our Newsletter</h1>
      <p className="text-center mb-6 text-gray-600">
        Stay updated with our latest news and updates!
      </p>
      <form action={formAction} ref={formRef} className="flex flex-col gap-4 text-black">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={pending}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-3 rounded-full hover:bg-blue-700 transition disabled:opacity-50"
          disabled={pending}
        >
          {pending ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {state.message && (
        <p
          className={`mt-4 text-center ${
            state.success ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {state.message}
        </p>
      )}
    </div>
  );
}
