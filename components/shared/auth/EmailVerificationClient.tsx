"use client";

import { verifyEmail } from "@/actions/auth/email-verification";
import Heading from "@/components/common/Heading";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Button from "../Button";
import { useRouter } from "next/navigation";

export default function EmailVerificationClient() {
  const searchParams = useSearchParams();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState(false);
  const [isPending, setIsPending] = useState(true);

  const router = useRouter();

  const token = searchParams.get("token");

  useEffect(() => {
    setIsPending(true);
    if (!token) {
      toast.error(`${error}`);
      return setError("missing verification token");
    }

    verifyEmail(token).then((res) => {
      toast.success(res.success);
      setSuccess(true);
    });

    setIsPending(false);
  }, [token]);

  return (
    <div className="flex flex-col max-w-[500px] w-full mx-auto border p-3 items-center mt-8">
      <Heading center title="Nexablog" />
      {isPending && <div>Verifing Email....</div>}
      {success && (
        <Button
          label="Back to signin"
          type="submit"
          outlined
          onClick={() => router.push("/")}
        />
      )}
    </div>
  );
}
