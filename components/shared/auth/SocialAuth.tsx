"use client";

import React from "react";
import Button from "../Button";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SocialAuth() {
  return (
    <div className="flex gap-2 flex-col md:flex-row">
      <Button
        outlined
        type="button"
        label="Continue with Github"
        icon={FaGithub}
        onClick={() => {}}
      />
      <Button
        type="button"
        outlined
        label="Continue with Google"
        icon={FaGoogle}
        onClick={() => {}}
      />
    </div>
  );
}
