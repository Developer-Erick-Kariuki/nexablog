"use server";

import { prisma } from "@/lib/db";
import { getUserById } from "@/lib/user";
import { BlogSchema, BlogSchemaType } from "@/schemas/schemas";

export const createBlog = async (values: BlogSchemaType) => {
  const validFields = BlogSchema.safeParse(values);

  if (!validFields.success) return { error: "Invalid fields" };

  const { userId, isPublished, title } = validFields.data;

  const user = await getUserById(userId);

  if (!user) return { error: "User does not exist" };

  if (isPublished && !user.emailVerified) {
    return { error: "User email not verified" };
  }
  // 👇 Check for existing blog with same title by same user

  const existingBlog = await prisma.blog.findFirst({
    where: { userId, title },
  });

  if (existingBlog) {
    return { error: "Blog already exists" };
  }

  await prisma.blog.create({
    data: {
      ...validFields.data,
    },
  });

  if (isPublished) {
    return { success: "blog published successfully" };
  }

  return { success: "blog saved" };
};
