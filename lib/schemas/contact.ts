import { z } from "zod";

export const PROJECT_TYPE_OPTIONS = [
  "New React Native App",
  "Existing React Native App",
  "Mobile MVP",
  "Full-Stack Mobile Application",
  "AI-Powered Mobile App",
  "Other",
] as const;

export const BUDGET_OPTIONS = ["Under $5k", "$5k–$15k", "$15k–$50k", "$50k+", "Not sure yet"] as const;

export const TIMELINE_OPTIONS = ["ASAP", "Within 1 month", "1–3 months", "Flexible"] as const;

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
  projectType: z.enum(PROJECT_TYPE_OPTIONS, { message: "Select a project type" }),
  message: z
    .string()
    .min(1, { message: "Project description is required" })
    .max(2000, { message: "Maximum length is 2000" }),
  budget: z.enum(BUDGET_OPTIONS, { message: "Select a budget" }),
  timeline: z.enum(TIMELINE_OPTIONS, { message: "Select a timeline" }),
});

export type ContactFormType = z.infer<typeof contactFormSchema>;
