"use server";

import { ContactFormType } from "@/components/contact-section";
import ContactFormEmail from "@/email/contact-form-email";
import React from "react";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (payload: ContactFormType) => {
  try {
    return resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "dev.ezraanglo@gmail.com",
      subject: "Message from your portfolio",
      react: React.createElement(ContactFormEmail, payload),
    });
  }
  catch (error: unknown) {
    return {
      error: error  as Error,
    };
  }
};
