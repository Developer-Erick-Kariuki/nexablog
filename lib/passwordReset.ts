import { prisma } from "./db";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expiresIn = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: { email, token, expiresIn },
  });

  return passwordResetToken;
};

export const sendPasswordResetEmail = async (token: string) => {
  const resend = new Resend(process.env.RESENDAPIKEY);
  const passwordResetTokenLink = `${process.env.BASE_URL}/password-reset?token=${token}`;

  const res = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "kamaueric821@gmail.com",
    subject: "You received a password reset email",
    html: `<p>Click <a href="${passwordResetTokenLink}">Here</a> to reset your password</p>`,
  });

  return { error: res.error };
};
