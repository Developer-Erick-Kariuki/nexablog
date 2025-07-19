import Container from "@/components/common/Container";
import LoginForm from "@/components/shared/auth/LoginForm";
import React from "react";

export default function Login() {
  return (
    <Container>
      <div className="flex justify-center items-center h-screen">
        <LoginForm />
      </div>
    </Container>
  );
}
