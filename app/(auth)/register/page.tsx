import Container from "@/components/common/Container";
import RegisterForm from "@/components/shared/auth/RegisterForm";

import React from "react";

export default async function RegisterUser() {
  return (
    <Container>
      <div className="flex justify-center items-center h-screen">
        <RegisterForm />
      </div>
    </Container>
  );
}
