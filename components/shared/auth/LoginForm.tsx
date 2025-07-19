"use client";

import { LoginSchema, LoginSchemaType } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import Formfield from "../Formfield";
import Button from "../Button";
import Heading from "@/components/common/Heading";
import SocialAuth from "./SocialAuth";
import Link from "next/link";

export default function LoginForm() {
  const { register, handleSubmit, formState } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-[500px] m-auto"
    >
      <Heading title="Welcome to Nexablog" lg center />
      <Formfield
        id="email"
        register={register}
        error={formState.errors.email}
        placeholder="Email Address"
        type="email"
      />
      <Formfield
        id="password"
        register={register}
        error={formState.errors.password}
        placeholder="Password"
        type="password"
      />
      <Button type="submit" label="Login" onClick={() => {}} />
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
