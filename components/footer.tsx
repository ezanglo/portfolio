import React from "react";

export default function Footer() {
  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="mb-2 block text-xs">
        &copy; 2023 Ezra Anglo. All rights reserved.
      </small>
      <p className="text-xs">
        Built with React & Next.js (App Router & Server Actions), TypeScript,
        Tailwind CSS, Framer Motion, Shadcn/ui, React Hook Form, Zod, Email &
        Resend, Vercel hosting.
      </p>
    </footer>
  );
}
