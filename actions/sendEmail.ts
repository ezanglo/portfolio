"use server";

import { ContactFormType } from "@/components/contact-section";
import ContactFormEmail from "@/email/contact-form-email";
import { getErrorMessage } from "@/lib/utils";
import React from "react";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (payload: ContactFormType) => {
  try {
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "dev.ezraanglo@gmail.com",
      subject: "Message from your portfolio",
      reply_to: payload.email,
      react: React.createElement(ContactFormEmail, payload),
    });

    if (!data.id) {
      return {
        error: getErrorMessage(data),
      };
    }
    return {
      data,
    };
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
};
