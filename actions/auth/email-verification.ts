"use server";

import { prisma } from "@/lib/db";
import { getUserEmail } from "@/lib/user";

export const verifyEmail = async (token: string) => {
  const verificationToken = await prisma.emailVerification.findUnique({
    where: { token },
  });

  if (!verificationToken) return { error: "verification token does not exist" };

  const isExpired = new Date(verificationToken.expiresIn) < new Date();

  if (isExpired) return { error: "verification token has expired" };

  const existingUser = await getUserEmail(verificationToken.email);

  if (!existingUser) return { error: "user does not exist" };

  // Fetch the user from the database to get the id
  const user = await prisma.user.findUnique({
    where: { email: verificationToken.email },
  });

  if (!user) return { error: "user does not exist" };

  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: new Date(), email: verificationToken.email },
  });

  return { success: "email verified" };
};
