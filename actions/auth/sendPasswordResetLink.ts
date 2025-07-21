"use server";

import {
  generatePasswordResetToken,
  sendPasswordResetEmail,
} from "@/lib/passwordReset";
import { getUserEmail } from "@/lib/user";
import { PasswordSchema, PasswordSchemaTyes } from "@/schemas/schemas";

export const sendPasswordResetLink = async (values: PasswordSchemaTyes) => {
  const validatedFields = PasswordSchema.safeParse(values);

  if (!validatedFields.success) return { error: "invalid fields" };

  const { email } = validatedFields.data;

  const user = (await getUserEmail(email)) as { email?: string };

  if (!user || !user.email) return { error: "User not found" };

  const passwordResetToken = await generatePasswordResetToken(email);

  const { error } = await sendPasswordResetEmail(passwordResetToken.token);

  if (error) {
    return { error: "something went wrong while sending password reset email" };
  }

  return { success: "password reset link  was sent successfully" };
};
