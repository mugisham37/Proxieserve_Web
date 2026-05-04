import { z } from "zod";

export const productBudgetSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().min(1, "Price is required"),
  productUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  idealCustomer: z.string().min(10, "Please describe your ideal customer"),
  currency: z.enum(["US$", "RWF", "KES", "EUR"]),
  dailyCap: z.number().min(10).max(2000),
  totalCap: z.number().min(100).max(50000),
});

export type ProductBudgetInput = z.infer<typeof productBudgetSchema>;
