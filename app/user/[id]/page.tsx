import Navbar from "@/components/shared/Navbar";
import React from "react";

export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      {" "}
      <Navbar />
      UserProfile {id}
    </div>
  );
}
