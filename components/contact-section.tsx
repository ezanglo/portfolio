"use client";

import { useSectionInView } from "@/hooks/use-section-in-view";
import React from "react";
import SectionHeading from "@/components/section-heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { sendEmail } from "@/actions/sendEmail";
import SubmitButton from "./submit-button";
import { useToast } from "./ui/use-toast";

const contactFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .max(500, {
      message: "Maximum length tis 500",
    })
    .email(),
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

export default function ContactSection() {
  const { ref } = useSectionInView("Contact", 0.5);
  const { toast } = useToast();

  const form = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  const handleSubmitAction = async () => {
    const valid = await form.trigger();
    if (valid) {
      const { data, error } = await sendEmail(form.getValues());
      if (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: error,
        });
      } else {
        toast({
          title: "Email sent successfully!",
        });
        form.reset();
      }
    }
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="scroll-mt-28 mb-28 sm:mb-40 px-5 sm:px-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        duration: 1,
      }}
    >
      <SectionHeading>Contact me</SectionHeading>
      <p className="-mt-6 text-secondary-foreground/50 text-sm">
        Please contact me directly at{" "}
        <a className="underline" href="mailto:dev.ezraanglo@gmail.com">
          dev.ezraanglo@gmail.com
        </a>{" "}
        or through this form.
      </p>
      <Form {...form}>
        <form className="flex flex-col gap-3 pt-10" action={handleSubmitAction}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your email"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your message"
                    className="h-56"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <SubmitButton />
        </form>
      </Form>
    </motion.section>
  );
}
