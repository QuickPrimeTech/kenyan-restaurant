import { MenuChoice } from "@/types/menu";
import z from "zod";
import {
  ZodTypeAny,
  ZodObject,
  ZodOptional,
  ZodDefault,
  ZodArray,
  ZodString,
} from "zod";

// Helper function for schema creation
export const createItemSchema = (
  choices: MenuChoice[] | null,
  defaultQuantity: number
) => {
  const schema: Record<string, z.ZodTypeAny> = {
    quantity: z.number().min(1).default(defaultQuantity),
    specialInstructions: z.string().default(""),
  };

  if (!choices) return z.object(schema);

  choices.forEach((choice) => {
    const choiceId = choice.id || choice.title;
    const isSingleSelection = choice.maxSelectable === 1 && choice.required;

    if (isSingleSelection) {
      schema[choiceId] = choice.required
        ? z.string({
            message: `Please select ${choice.title.toLowerCase()}`,
          })
        : z.string().optional();
    } else {
      let validation = z.array(z.string());

      if (choice.maxSelectable && choice.maxSelectable > 0) {
        validation = validation.max(choice.maxSelectable, {
          message: `Please select at most ${choice.maxSelectable} options`,
        });
      }

      schema[choiceId] = validation
        .default([])
        .refine((arr) => !choice.required || arr.length > 0, {
          message: `Please select at least one ${choice.title.toLowerCase()}`,
        });
    }
  });

  return z.object(schema);
};

export function generateDefaultValues(schema: ZodTypeAny) {
  const defaults: Record<string, any> = {};

  if (!(schema instanceof ZodObject)) return defaults;

  const shape = schema.shape;

  for (const key in shape) {
    const field = shape[key];

    // Case 1: Field has a .default()
    if (field instanceof ZodDefault) {
      defaults[key] = field.def.defaultValue;
      continue;
    }

    // Case 2: Optional without default → undefined
    if (field instanceof ZodOptional) {
      defaults[key] = undefined;
      continue;
    }

    // Case 3: Array fields → default to empty array
    if (field instanceof ZodArray) {
      defaults[key] = [];
      continue;
    }

    // Case 4: String fields → empty string
    if (field instanceof ZodString) {
      defaults[key] = "";
      continue;
    }

    // Case 5: Numbers → default 0
    const typeName = field._def.typeName;
    if (typeName === "ZodNumber") {
      defaults[key] = 0;
      continue;
    }

    // Fallback
    defaults[key] = undefined;
  }

  return defaults;
}
