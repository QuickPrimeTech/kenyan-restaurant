// schemas/contact.ts
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z
    .string()
    .regex(/^(\+254|0)7\d{8}$/, "Enter a valid Kenyan phone number.")
    .refine((val) => !/^(\+254|0)?(\d)\2{8}$/.test(val), {
      message: "Phone number cannot have all identical digits.",
    }),
  subject: z.string().min(1, "Please select a subject."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});
