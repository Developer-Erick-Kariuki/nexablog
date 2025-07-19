"use client";

import { RegisterSchema, RegisterSchemaTypes } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import Formfield from "../Formfield";
import Button from "../Button";
import Heading from "@/components/common/Heading";
import SocialAuth from "./SocialAuth";

export default function RegisterForm() {
  const { register, handleSubmit, formState } = useForm<RegisterSchemaTypes>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemaTypes> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-[500px] m-auto"
    >
      <Heading title="Create Nexablog account" lg center />
      <Formfield
        id="username"
        register={register}
        error={formState.errors.username}
        placeholder="Username"
        type="text"
      />
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
      <Formfield
        id="confirmPassword"
        register={register}
        error={formState.errors.confirmPassword}
        placeholder="Confirm Password"
        type="password"
      />
      <Button type="submit" label="Login" onClick={() => {}} />
      <div className="flex justify-center my-2">Or</div>
      <SocialAuth />
    </form>
  );
}
