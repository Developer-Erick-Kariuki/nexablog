import Container from "@/components/common/Container";
import EmailVerificationClient from "@/components/shared/auth/EmailVerificationClient";
import React from "react";

export default function page() {
  return (
    <Container>
      <EmailVerificationClient />
    </Container>
  );
}
