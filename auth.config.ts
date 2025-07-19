import Credetials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas/schemas";
import { getUserEmail } from "./lib/user";
import bcrypt from "bcryptjs";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLEINT_SECRET,
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLEINT_SECRET,
    }),

    Credetials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserEmail(email);

          if (!user) return null;

          // Assert user has a password property
          const { password: hashedPassword } = user as { password: string };

          const isCorrectPassword = await bcrypt.compare(
            password,
            hashedPassword
          );

          if (isCorrectPassword) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
