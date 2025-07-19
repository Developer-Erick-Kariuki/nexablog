"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function RegisterButton() {
  const router = useRouter();
  return <button onClick={() => router.push("/register")}>Register</button>;
}
