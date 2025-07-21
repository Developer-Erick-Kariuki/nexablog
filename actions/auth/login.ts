"use server";

import { signIn } from "@/auth";
import {
  generateEmailVerificationToken,
  sendVerificationToken,
} from "@/lib/emailVerification";
import { getUserEmail } from "@/lib/user";
import { LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, LoginSchemaType } from "@/schemas/schemas";
import { AuthError } from "next-auth";

export const login = async (values: LoginSchemaType) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "invalid fields" };
  }

  const { email, password } = validatedFields.data;

  const user = (await getUserEmail(email)) as {
    emailVerified?: boolean;
    password?: string;
    email: string;
  };

  if (!user) {
    return { error: "Email does not exist" };
  }

  if (!email || !password || !user.password) {
    return { error: "Ivalid credetials" };
  }

  if (!user.emailVerified) {
    const emailVerificationToken = await generateEmailVerificationToken(
      user.email
    );

    const { error } = await sendVerificationToken(
      emailVerificationToken?.token
    );

    if (error) {
      return {
        error:
          "an error occured while trying to send a verification token tru again ",
      };
    }

    return {
      success: "Verification email sent. Please verify your email to continue",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credetials" };
        default:
          return { error: "oops something went wrong" };
      }
    }
  }
};
