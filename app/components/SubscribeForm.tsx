'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom'; // Fallback for React 18
import { subscribeToNewsletter } from '@/app/actions/newsletter';
import { useEffect, useRef } from 'react';

export default function SubscribeForm() {
  const [state, formAction] = useActionState(subscribeToNewsletter, {
    success: false,
    message: '',
    status: undefined,
  });
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.success && state.status === 'pending_verification') {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
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
