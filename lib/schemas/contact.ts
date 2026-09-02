import { z } from "zod";

export const contactFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .max(500, {
      message: "Maximum length tis 500",
    })
    .email({
      message: "Invalid email",
    }),
  message: z
    .string()
    .min(1, {
      message: "Message is required",
    })
    .max(500, {
      message: "Maximum length tis 500",
    }),
});

export type ContactFormType = z.infer<typeof contactFormSchema>;
