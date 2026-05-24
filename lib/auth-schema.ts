import { z } from "zod";

// ---------------------------------------------------------------------------
// Shared validators
// ---------------------------------------------------------------------------
const rwandaPhone = z
  .string()
  .min(9, "Enter a valid phone number")
  .regex(/^[\d\s\-\+\(\)]+$/, "Enter a valid phone number");

const emailOrPhone = z.union([
  z.string().email("Enter a valid email address"),
  rwandaPhone,
]);

// ---------------------------------------------------------------------------
// 1. Client login
// ---------------------------------------------------------------------------
export const loginSchema = z.object({
  identifierType: z.enum(["email", "phone"]),
  identifier: z.string().min(1, "Required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});
export type LoginData = z.infer<typeof loginSchema>;

// ---------------------------------------------------------------------------
// 2. Client signup
// ---------------------------------------------------------------------------
export const signupSchema = z
  .object({
    name: z.string().min(2, "Enter your full name"),
    identifierType: z.enum(["email", "phone"]),
    identifier: z.string().min(1, "Required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    language: z.enum(["en", "rw", "fr"]),
    code: z
      .string()
      .regex(/^(PRX-\d{4}-\d{5})?$/, "Enter a valid PRX code (PRX-YYYY-NNNNN)")
      .optional()
      .or(z.literal("")),
    terms: z
      .boolean()
      .refine((v) => v === true, { message: "You must agree to the terms" }),
  });
export type SignupData = z.infer<typeof signupSchema>;

// ---------------------------------------------------------------------------
// 3. Staff login
// ---------------------------------------------------------------------------
export const staffLoginSchema = z.object({
  email: z.string().email("Enter a valid work email"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["agent", "admin"]),
});
export type StaffLoginData = z.infer<typeof staffLoginSchema>;

// ---------------------------------------------------------------------------
// 4. Forgot password (stage 1)
// ---------------------------------------------------------------------------
export const forgotSchema = z.object({
  identifierType: z.enum(["email", "phone"]),
  identifier: z.string().min(1, "Required"),
});
export type ForgotData = z.infer<typeof forgotSchema>;

// ---------------------------------------------------------------------------
// 5. Reset password (stage 2)
// ---------------------------------------------------------------------------
export const resetSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type ResetData = z.infer<typeof resetSchema>;

// ---------------------------------------------------------------------------
// 6. OTP verification
// ---------------------------------------------------------------------------
export const otpSchema = z.object({
  code: z
    .string()
    .length(6, "Enter the 6-digit code")
    .regex(/^\d{6}$/, "Code must be digits only"),
});
export type OtpData = z.infer<typeof otpSchema>;

// ---------------------------------------------------------------------------
// 7. Claim by code
// ---------------------------------------------------------------------------
export const claimSchema = z.object({
  code: z
    .string()
    .regex(/^PRX-\d{4}-\d{5}$/, "Enter a valid tracking code (PRX-YYYY-NNNNN)"),
  phone: rwandaPhone,
});
export type ClaimData = z.infer<typeof claimSchema>;
