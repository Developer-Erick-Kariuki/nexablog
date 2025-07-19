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
import Alert from "../Alert";

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const { register, handleSubmit, formState } = useForm<RegisterSchemaTypes>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemaTypes> = (data) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      signup(data).then((res) => {
        setError(res.error);
        setSuccess(res.success);
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
      {error && <Alert message={error} error />}
      {success && <Alert message={success} success />}
      <Button
        disabled={isPending}
        type="submit"
        label={isPending ? "Submitting" : "Regsister"}
        onClick={() => {}}
      />
      <div className="flex justify-center my-2">Or</div>
      <SocialAuth />
    </form>
  );
}
