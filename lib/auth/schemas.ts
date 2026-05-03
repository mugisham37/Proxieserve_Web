import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  consentRequired: z
    .boolean()
    .refine((v) => v === true, "You must accept the Terms of Service"),
  consentMarketing: z.boolean(),
});

export const signInSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

export const verifyEmailSchema = z.object({
  code: z.string().length(6, "Enter the complete 6-digit code"),
});

export const resetRequestSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export const setNewPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type ResetRequestInput = z.infer<typeof resetRequestSchema>;
export type SetNewPasswordInput = z.infer<typeof setNewPasswordSchema>;
