"use client";

import { RegisterSchema, RegisterSchemaTypes } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import Formfield from "../Formfield";
import Button from "../Button";
import Heading from "@/components/common/Heading";
import SocialAuth from "./SocialAuth";
import { signup } from "@/actions/auth/register";
import { toast } from "sonner";
import Link from "next/link";

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, formState } = useForm<RegisterSchemaTypes>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemaTypes> = (data) => {
    startTransition(() => {
      signup(data).then((res) => {
        toast.error(res.error);
        toast.success(res.success);
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-[500px] m-auto"
    >
      <Heading title="Create Nexablog account" lg center />
      <Formfield
        id="name"
        register={register}
        error={formState.errors.name}
        placeholder="Username"
        type="text"
        disabled={isPending}
      />
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
      <Formfield
        id="confirmPassword"
        register={register}
        error={formState.errors.confirmPassword}
        placeholder="Confirm Password"
        type="password"
        disabled={isPending}
      />

      <Button
        disabled={isPending}
        type="submit"
        label={isPending ? "Submitting" : "Regsister"}
        onClick={() => {}}
      />
      <div className="flex justify-center my-2">Or</div>
      <SocialAuth />
      <h2>
        Already have an account{" "}
        <span className="text-purple-500">
          <Link href="/login">SignIn</Link>
        </span>
      </h2>
    </form>
  );
}
