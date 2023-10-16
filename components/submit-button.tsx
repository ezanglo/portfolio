import React from "react";

import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Loader2Icon } from "lucide-react";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="rounded-full hover:scale-110 group mr-auto w-[8rem]"
      disabled={pending}
    >
      {pending ? (
        <Loader2Icon className="animate-spin w-5 h-5" />
      ) : (
        <>
          Submit
          <SendHorizonal className="ml-2 w-4 h-4 transition-all group-hover:translate-x-1" />
        </>
      )}
    </Button>
  );
}
