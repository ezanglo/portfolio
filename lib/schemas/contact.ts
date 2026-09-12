import { z } from "zod";

export const PROJECT_TYPE_OPTIONS = [
  "New React Native App",
  "Existing React Native App",
  "Mobile MVP",
  "Full-Stack Mobile Application",
  "AI-Powered Mobile App",
  "Other",
] as const;

export function isCasualProjectType(projectType?: string) {
  return !projectType;
}

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(200, { message: "Maximum length is 200" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .max(500, { message: "Maximum length is 500" })
    .email({ message: "Invalid email" }),
  projectType: z.enum(PROJECT_TYPE_OPTIONS).optional(),
  message: z
    .string()
    .min(1, { message: "Message is required" })
    .max(2000, { message: "Maximum length is 2000" }),
  company: z.string().max(200).optional(),
});

export type ContactFormType = z.infer<typeof contactFormSchema>;

// `company` is a honeypot: it's hidden from real visitors, so anything filling it in is a bot.
export function isSpamSubmission(data: Pick<ContactFormType, "company">) {
  return Boolean(data.company);
}
