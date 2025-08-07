// app/api/subscribe/route.ts
import { NextResponse } from 'next/server';

const apiKey = process.env.BREVO_API_KEY;
const listId = process.env.BREVO_LIST_ID; // string for fetch

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey as string,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        listIds: listId ? [parseInt(listId)] : [],
        updateEnabled: true,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Brevo API error:', errorData);
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Successfully subscribed' }, { status: 200 });
  } catch (err: any) {
    console.error('Subscription error:', err.message || err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
