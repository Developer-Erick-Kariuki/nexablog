"use client";

import {
  LoginSchema,
  LoginSchemaType,
  PasswordSchema,
  PasswordSchemaTyes,
} from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import Formfield from "../Formfield";
import Button from "../Button";
import Heading from "@/components/common/Heading";
import { toast } from "sonner";
import { sendPasswordResetLink } from "@/actions/auth/sendPasswordResetLink";

export default function LoginForm() {
  const [isPending, statTransition] = useTransition();

  const { register, handleSubmit, formState } = useForm<PasswordSchemaTyes>({
    resolver: zodResolver(PasswordSchema),
  });

  const onSubmit: SubmitHandler<PasswordSchemaTyes> = (data) => {
    statTransition(() => {
      sendPasswordResetLink(data).then((res) => {
        console.log(res);
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
      className="flex flex-col  gap-4 w-full max-w-[500px] m-auto"
    >
      <Heading title="Welcome to Nexablog" lg center />
      <Formfield
        id="email"
        register={register}
        error={formState.errors.email}
        placeholder="Email Address"
        type="email"
        disabled={isPending}
      />

      <Button
        type="submit"
        label={isPending ? "Submitting" : "Send Email"}
        onClick={() => {}}
        disabled={isPending}
      />
    </form>
  );
}
