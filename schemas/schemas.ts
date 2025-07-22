import { email, z } from "zod";

export const LoginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, { message: "password must six or more characters long" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

// Register schema
export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "username must be 4 or more characters long" })
      .max(30, "username should not be more than 30 characters long"),
    email: z.email(),
    password: z
      .string()
      .min(6, { message: "password must be 6 characters or more" }),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Password must match!",
    path: ["confirmPassword"],
  });

export type RegisterSchemaTypes = z.infer<typeof RegisterSchema>;

export const PasswordSchema = z.object({
  email: z.email(),
});

export type PasswordSchemaTyes = z.infer<typeof PasswordSchema>;

export const PasswordResetSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "password must be 6 characters or more" }),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Password must match!",
    path: ["confirmPassword"],
  });

export type PasswordResetSchemaTyes = z.infer<typeof PasswordResetSchema>;

export const BlogSchema = z.object({
  userId: z.string(),
  title: z
    .string()
    .min(10, { message: "title shoud be 10 or more characters long" })
    .max(150, { message: "title should not be more than 150 characters" }),
  content: z.string().min(10, { message: "content too short" }),
  coverImage: z.string().optional(),
  isPublished: z.boolean(),
  tags: z
    .array(z.string())
    .max(4, { message: "You can only select a max of 4 tags" }),
});

export type BlogSchemaType = z.infer<typeof BlogSchema>;
