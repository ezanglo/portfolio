"use client";

import { useContactForm } from "@/hooks/use-contact-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import SubmitButton from "@/components/legacy/submit-button";

export default function BlockworkContactForm() {
  const { form, handleSubmitAction } = useContactForm();

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" action={handleSubmitAction}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-black uppercase">Email</FormLabel>
              <FormControl>
                <Input placeholder="you@company.com" className="rounded-none border-2 border-view-fg" {...field} />
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
              <FormLabel className="font-black uppercase">Message</FormLabel>
              <FormControl>
                <Textarea placeholder="What are you building?" className="h-40 rounded-none border-2 border-view-fg" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <SubmitButton
          label="Hire me"
          className="w-fit rounded-none border-[3px] border-view-fg uppercase font-black"
        />
      </form>
    </Form>
  );
}
