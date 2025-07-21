import { prisma } from "./db";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.emailVerification.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const generateEmailVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expiresIn = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.emailVerification.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await prisma.emailVerification.create({
    data: { email, token, expiresIn },
  });

  return verificationToken;
};

export const sendVerificationToken = async (token: string) => {
  const resend = new Resend(process.env.RESENDAPIKEY);
  const emailVerificationLink = `${process.env.BASE_URL}/email-verification?token=${token}`;

  const res = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "kamaueric821@gmail.com",
    subject: "Here is your verification token",
    html: `<p>Click <a href="${emailVerificationLink}">Here</a> to verify your email address</p>`,
  });

  return { error: res.error };
};
