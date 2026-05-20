import { z } from "zod";
import { type AppField } from "./services-data";

export const step1Schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  nationalId: z.string().min(5, "National ID is required"),
  dob: z.string().min(1, "Date of birth is required"),
  phone: z.string().min(8, "Phone number is required"),
  whatsapp: z.boolean(),
  email: z.string().email("Enter a valid email").or(z.literal("")),
  language: z.enum(["en", "rw", "fr"]),
  consent: z.boolean().refine((v) => v === true, { message: "You must agree to continue" }),
});

export const step4Schema = z.object({
  accuracy: z.boolean().refine((v) => v === true, { message: "Please confirm your information is correct" }),
  terms: z.boolean().refine((v) => v === true, { message: "You must agree to the terms" }),
});

export function buildStep2Schema(fields: AppField[]) {
  const entries: [string, z.ZodTypeAny][] = [];
  for (const field of fields) {
    if (field.conditional) continue;
    const validator: z.ZodTypeAny = field.required
      ? z.string().min(1, `${field.label} is required`)
      : z.string().optional();
    entries.push([field.id, validator]);
  }
  return z.object(Object.fromEntries(entries));
}

export type Step1Data = z.infer<typeof step1Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
