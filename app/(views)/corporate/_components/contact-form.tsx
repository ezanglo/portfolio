"use client";

import { useContactForm } from "@/hooks/use-contact-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import SubmitButton from "@/components/submit-button";

export default function CorporateContactForm() {
  const { form, handleSubmitAction } = useContactForm();

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" action={handleSubmitAction}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@company.com" className="rounded-lg" {...field} />
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
                <Textarea placeholder="What are you hiring for?" className="h-40 rounded-lg" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <SubmitButton label="Say hello" className="rounded-lg" />
      </form>
    </Form>
  );
}
