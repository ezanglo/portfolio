"use client";

import { useContactForm } from "@/hooks/use-contact-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import SubmitButton from "@/components/submit-button";

export default function RuntimeContactForm() {
  const { form, handleSubmitAction } = useContactForm();

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4 font-mono" action={handleSubmitAction}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="you@company.com" className="rounded" {...field} />
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
              <FormLabel>message</FormLabel>
              <FormControl>
                <Textarea placeholder="what are you building?" className="h-40 rounded" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <SubmitButton label="say hello" className="rounded" />
      </form>
    </Form>
  );
}
