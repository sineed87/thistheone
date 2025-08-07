'use server';

import { z } from 'zod';
import axios from 'axios';

interface ActionResponse {
  success: boolean;
  message: string;
  status?: 'pending_verification' | 'subscribed' | 'error';
}

const emailSchema = z.string().email({ message: 'Invalid email address' });

export async function subscribeToNewsletter(
  _prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  const email = formData.get('email')?.toString().trim();

  // Validate email
  const validation = emailSchema.safeParse(email);
  if (!validation.success) {
    const errorMessage = validation.error.issues[0]?.message || 'Invalid email address';
    return {
      success: false,
      message: errorMessage,
      status: 'error',
    };
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      message: 'Newsletter service is not configured',
      status: 'error',
    };
  }

  try {
    const response = await axios.post(
      'https://api.buttondown.email/v1/subscribers',
      {
        email_address: email,
        notes: 'Subscribed through website',
        tags: ['website-signup'],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${apiKey}`,
        },
      }
    );

    if (response.status === 201) {
      return {
        success: true,
        message: 'Please check your email to confirm your subscription!',
        status: 'pending_verification',
      };
    }

    const error = await response.data;
    if (error?.detail?.includes('already subscribed')) {
      return {
        success: false,
        message: 'This email is already subscribed',
        status: 'error',
      };
    }

    return {
      success: false,
      message: 'Failed to subscribe. Please try again later.',
      status: 'error',
    };
  } catch (error) {
    console.error('Buttondown API error:', error);
    return {
      success: false,
      message: 'Failed to subscribe. Please try again later.',
      status: 'error',
    };
  }
}

