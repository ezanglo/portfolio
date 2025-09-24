import React from "react";
import { SiteConfig } from "@/payload-types";

interface FooterProps {
  siteConfig: SiteConfig | null;
}

export default function Footer({ siteConfig }: FooterProps) {
  const footerData = siteConfig?.footer;
  const copyrightText = footerData?.copyrightText || '© 2023 Ezra Anglo. All rights reserved.';
  const techStackDescription = footerData?.techStackDescription || 'Built with React & Next.js (App Router & Server Actions), TypeScript, Tailwind CSS, Framer Motion, Shadcn/ui, React Hook Form, Zod, Email & Resend, Vercel hosting.';

  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="mb-2 block text-xs">
        {copyrightText}
      </small>
      <p className="text-xs">
        {techStackDescription}
      </p>
    </footer>
  );
}
