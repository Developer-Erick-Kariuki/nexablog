"use client";

import { LoginSchema, LoginSchemaType } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import Formfield from "../Formfield";
import Button from "../Button";
import Heading from "@/components/common/Heading";
import SocialAuth from "./SocialAuth";
import Link from "next/link";
import { login } from "@/actions/auth/login";

import { useRouter } from "next/navigation";
import { LOGIN_REDIRECT } from "@/routes";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();

  const [isPending, statTransition] = useTransition();

  const { register, handleSubmit, formState } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    statTransition(() => {
      login(data).then((res) => {
        if (res?.error) {
          toast.error(res.error);
        }

        if (res?.success) {
          toast.success(res.success);
        }

        if (!res?.error) {
          router.push(LOGIN_REDIRECT);
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
      <Formfield
        id="password"
        register={register}
        error={formState.errors.password}
        placeholder="Password"
        type="password"
        disabled={isPending}
      />

      <Button
        type="submit"
        label={isPending ? "Submitting" : "login"}
        onClick={() => {}}
        disabled={isPending}
      />
      <Link
        className="text-sm mt-2 underline opacity-85"
        href="/password-email"
      >
        Forgot Paaword?
      </Link>
      <div className="flex justify-center my-2">Or</div>
      <SocialAuth />
      <div className="flex gap-4">
        Register here{" "}
        <Link className="text-purple-400" href="/register">
          Register
        </Link>
      </div>
    </form>
  );
}
