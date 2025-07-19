"use client";

import React from "react";
import Button from "../Button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { LOGIN_REDIRECT } from "@/routes";

export default function SocialAuth() {
  const handleOnclick = (provider: "google" | "github") => {
    signIn(provider, {
      redirectTo: LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex gap-2 flex-col md:flex-row">
      <Button
        outlined
        type="button"
        label="Continue with Github"
        icon={FaGithub}
        onClick={() => handleOnclick("github")}
      />
      <Button
        type="button"
        outlined
        label="Continue with Google"
        icon={FaGoogle}
        onClick={() => handleOnclick("google")}
      />
    </div>
  );
}
