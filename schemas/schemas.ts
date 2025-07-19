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
    username: z
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
