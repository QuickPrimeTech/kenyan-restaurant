import z from "zod";

export const pickupSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),

  email: z.string().email("Enter a valid email"), // ✅ mandatory

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^(\+254|254|0)[17]\d{8}$/, "Enter a valid Kenyan phone number"),

  instructions: z.string().optional(),
});

export type PickupFormValues = z.infer<typeof pickupSchema>;
