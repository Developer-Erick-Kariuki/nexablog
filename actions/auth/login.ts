"use server";

import { signIn } from "@/auth";
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
  };

  if (!user) {
    return { error: "Email already exists" };
  }

  if (!email || !password || !user.password) {
    return { error: "Ivalid credetials" };
  }

  //   if (!user.emailVerified) {
  //     return { error: "Email not verified" };
  //   }

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
