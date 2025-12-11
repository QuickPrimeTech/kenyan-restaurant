import { MenuChoice } from "@/types/menu";
import z from "zod";

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
            message: `Please select a ${choice.title.toLowerCase()}`,
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

export function transformFormData(raw: any, choices: MenuChoice[]) {
  const { quantity, specialInstructions, ...rest } = raw;

  const selectedChoices = choices.map((choice) => {
    const choiceId = choice.id;
    const selected = rest[choiceId];

    return {
      choiceId,
      title: choice.title,
      selected: Array.isArray(selected) ? selected : [selected].filter(Boolean),
    };
  });

  return {
    quantity,
    specialInstructions,
    selectedChoices,
  };
}
