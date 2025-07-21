"use client";

import {
  PasswordResetSchema,
  PasswordResetSchemaTyes,
} from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import Formfield from "../Formfield";
import Button from "../Button";
import Heading from "@/components/common/Heading";

import { toast } from "sonner";
import { resetPassword } from "@/actions/auth/reset-password";
import { useSearchParams } from "next/navigation";

export default function PasswordResetForm() {
  const searchParams = useSearchParams();

  const [isPending, statTransition] = useTransition();

  const { register, handleSubmit, formState } =
    useForm<PasswordResetSchemaTyes>({
      resolver: zodResolver(PasswordResetSchema),
    });

  const token = searchParams.get("token");

  const onSubmit: SubmitHandler<PasswordResetSchemaTyes> = (data) => {
    if (!token) {
      toast.error("Missing password reset token.");
      return;
    }
    statTransition(() => {
      resetPassword(data, token).then((res) => {
        if (res?.error) {
          toast.error(res.error);
        }

        if (res?.success) {
          toast.success(res.success);
        }
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-[500px] m-auto"
    >
      <Heading title="Welcome to Nexablog" lg center />
      <Formfield
        id="password"
        register={register}
        error={formState.errors.password}
        placeholder="Password"
        type="password"
        disabled={isPending}
      />
      <Formfield
        id="confirmPassword"
        register={register}
        error={formState.errors.confirmPassword}
        placeholder="Confirm Password"
        type="password"
        disabled={isPending}
      />

      <Button
        type="submit"
        label={isPending ? "Submitting" : "Reset Password"}
        onClick={() => {}}
        disabled={isPending}
      />
    </form>
  );
}
