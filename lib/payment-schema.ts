import { z } from "zod";

export const cardSchema = z.object({
  cardNumber: z
    .string()
    .min(19, "Enter a valid 16-digit card number")
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Enter a valid card number"),
  expiry: z
    .string()
    .regex(/^\d{2} \/ \d{2}$/, "Enter expiry as MM / YY")
    .refine((v) => {
      const [mm] = v.split(" / ");
      const month = parseInt(mm, 10);
      return month >= 1 && month <= 12;
    }, "Invalid month"),
  cvc: z
    .string()
    .min(3, "Enter CVC")
    .max(4, "CVC is 3–4 digits")
    .regex(/^\d+$/, "CVC must be numeric"),
  cardholderName: z.string().min(2, "Enter the name on your card"),
  saveCard: z.boolean(),
});

export const momoSchema = z.object({
  localNumber: z
    .string()
    .min(9, "Enter a valid 9-digit MTN number")
    .max(9, "Enter a valid 9-digit MTN number")
    .regex(/^\d{9}$/, "Enter digits only — e.g. 788123456"),
  isAccountPhone: z.boolean(),
});

export const otpSchema = z.object({
  otp: z.string().length(6, "Enter all 6 digits"),
});

export const disputeSchema = z.object({
  reason: z.string().min(1, "Select a reason"),
  details: z
    .string()
    .min(10, "Please provide more detail")
    .max(500, "Maximum 500 characters"),
});

export type CardFormData = z.infer<typeof cardSchema>;
export type MomoFormData = z.infer<typeof momoSchema>;
export type DisputeFormData = z.infer<typeof disputeSchema>;
