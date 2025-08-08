"use server";

import { EmailTemplate } from "@/app/components/ui/email-template";
import { Resend } from "resend";
import { z } from "zod";
import { formSchema } from "./schemas";

const resend = new Resend(process.env.RESEND_API_KEY);

export const send = async (emailFormData: z.infer<typeof formSchema>) => {
  try {
    // TODO: Add this emailFormData to some database if needed

    const { error } = await resend.emails.send({
      from: `Denis <${process.env.RESEND_FROM_EMAIL}>`,
      to: [emailFormData.email],
      subject: "Welcome",
      react: EmailTemplate({
        firstName: emailFormData.firstName,
        message: emailFormData.message, // Pass the message here
      }),
    });

    if (error) {
      throw error;
    }
  } catch (e) {
    throw e;
  }
};
