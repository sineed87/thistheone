// pages/api/subscribe.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// Fallback to `any` because Brevo SDK lacks TypeScript types
const SibApiV3Sdk: any = require('sib-api-v3-sdk');

const apiKey = process.env.BREVO_API_KEY;
const listId = Number(process.env.BREVO_LIST_ID); // optional, if using a list

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKeyInstance = defaultClient.authentications['api-key'];
    apiKeyInstance.apiKey = apiKey;

    const contactsApi = new SibApiV3Sdk.ContactsApi();

    await contactsApi.createContact({
      email,
      listIds: listId ? [listId] : [],
      updateEnabled: true,
    });

    return res.status(200).json({ message: 'Successfully subscribed' });
  } catch (error: any) {
    console.error('Brevo subscription error:', error);
    return res.status(500).json({ error: 'Failed to subscribe user' });
  }
}
