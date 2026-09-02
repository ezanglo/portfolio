"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { sendEmail } from "@/actions/sendEmail";
import { contactFormSchema, type ContactFormType } from "@/lib/schemas/contact";

export function useContactForm() {
  const form = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  const handleSubmitAction = async () => {
    const valid = await form.trigger();
    if (!valid) return;
    const { error } = await sendEmail(form.getValues());
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Message sent successfully!");
      form.reset();
    }
  };

  return { form, handleSubmitAction };
}
