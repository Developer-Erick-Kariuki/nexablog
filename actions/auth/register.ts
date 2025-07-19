"use server";

import bcrypt from "bcryptjs";

import { RegisterSchema, RegisterSchemaTypes } from "@/schemas/schemas";
import { prisma } from "@/lib/db";
import { getUserEmail } from "@/lib/user";

export const signup = async (values: RegisterSchemaTypes) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "invalid inputs" };
  }

  const { name, email, password } = validatedFields.data;

  // check if user exists

  const user = await getUserEmail(email);

  if (user) {
    return { error: "Email already in use" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return { success: "User created successfully" };
};
