import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/db";
import { getUserEmail } from "./lib/user";

declare module "next-auth" {
  interface Session {
    user: {
      role: "USER" | "ADMIN";
      userId: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.email) return token;
      const user = (await getUserEmail(token.email)) as {
        role: string;
        id: string;
      };

      if (!user) return token;

      token.role = user.role;
      token.userId = user.id;

      return token;
    },
    async session({ session, token }) {
      if (token.role) {
        session.user.role = token.role as "USER" | "ADMIN";
      }

      if (token.userId) {
        session.user.userId = token.userId as string;
      }

      return session;
    },
  },
});
