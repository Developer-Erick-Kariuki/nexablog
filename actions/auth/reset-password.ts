"use server";

import { prisma } from "@/lib/db";
import { getPasswordResetTokenByToken } from "@/lib/passwordReset";
import { getUserEmail } from "@/lib/user";
import {
  PasswordResetSchema,
  PasswordResetSchemaTyes,
} from "@/schemas/schemas";
import bcrypt from "bcryptjs";

export const resetPassword = async (
  values: PasswordResetSchemaTyes,
  token?: string | null
) => {
  if (!token) return { error: "invalid reset token" };

  const validatedFields = PasswordResetSchema.safeParse(values);

  if (!validatedFields.success) return { error: "invalid fields" };

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "invalid token" };
  }

  const expired = existingToken?.expiresIn
    ? new Date(existingToken.expiresIn) < new Date()
    : true;

  if (expired) {
    return { error: "invalid reset token" };
  }

  if (!existingToken?.email) {
    return { error: "invalid token email" };
  }
  const user = (await getUserEmail(existingToken.email)) as {
    id?: string;
    email?: string;
  };

  if (!user) {
    return { error: "User does not exist" };
  }

  const { password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      email: existingToken.email,
      emailVerified: new Date(),
    },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password Updated successfully" };
};
