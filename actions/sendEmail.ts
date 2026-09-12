"use server";

import { headers } from "next/headers";
import { ContactFormType, contactFormSchema } from "@/lib/schemas/contact";
import { rateLimit } from "@/lib/rate-limit";
import { SITE } from "@/content";
import ContactFormEmail from "@/email/contact-form-email";
import React from "react";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT = { max: 3, windowMs: 10 * 60 * 1000 };

export const sendEmail = async (payload: ContactFormType) => {
  const parsed = contactFormSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: new Error("Invalid submission") };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { ok } = rateLimit(`contact:${ip}`, RATE_LIMIT.max, RATE_LIMIT.windowMs);
  if (!ok) {
    return { error: new Error("Too many submissions — please try again later.") };
  }

  try {
    return await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: SITE.email,
      subject:
        parsed.data.projectType === "Just Want to Chat"
          ? `New message from ${parsed.data.name}`
          : `New project inquiry from ${parsed.data.name}`,
      react: React.createElement(ContactFormEmail, parsed.data),
    });
  } catch (error: unknown) {
    return {
      error: error as Error,
    };
  }
};
