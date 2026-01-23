import { z } from "zod";
export const loginSchema = z.object({
  email: z.string({ required_error: "Email or phone required" }),
  password: z
    .string({ required_error: "Password required" })
    .min(6, "Password must be at least 6 characters"),
});
export const registrationSchema = z.object({
  fullName: z
    .string({ required_error: "Name required" })
    .min(3, "Name must be at least 3 characters"),
  email: z.string({ required_error: "Email required" }).email("Invalid email"),

  password: z
    .string({ required_error: "Password required" })
    .min(6, "Password must be at least 6 characters"),
});

export const changePasswordSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    oldPassword: z.string().min(1, { message: "Old password is required" }),
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
