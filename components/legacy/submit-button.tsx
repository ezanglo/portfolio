import React from "react";

import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { useFormStatus as useFormStatus } from "react-dom";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  label?: React.ReactNode;
  pendingLabel?: React.ReactNode;
  className?: string;
}

export default function SubmitButton({
  label = (
    <>
      Submit
      <SendHorizonal className="ml-2 w-4 h-4 transition-all group-hover:translate-x-1" />
    </>
  ),
  pendingLabel = <Loader2Icon className="animate-spin w-5 h-5" />,
  className,
}: SubmitButtonProps = {}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={cn("rounded-full hover:scale-110 group mr-auto w-[8rem]", className)}
      disabled={pending}
    >
      {pending ? pendingLabel : label}
    </Button>
  );
}
