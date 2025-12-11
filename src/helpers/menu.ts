import { CartItemChoices } from "@/types/cart";
import { MenuChoice } from "@/types/menu";

// Helper function for price calculation
export const calculateTotalPrice = (
  formData: any,
  choices: MenuChoice[],
  basePrice: number
) => {
  let additional = 0;

  choices?.forEach((choice) => {
    const choiceId = choice.id || choice.title;
    const selected = formData[choiceId];

    if (!selected) return;

    if (Array.isArray(selected)) {
      selected.forEach((label) => {
        const option = choice.options.find((o) => o.label === label);
        if (option?.price) additional += option.price;
      });
    } else {
      const option = choice.options.find((o) => o.label === selected);
      if (option?.price) additional += option.price;
    }
  });

  return (basePrice + additional) * (formData.quantity || 1);
};

// Helper function for selection description
export const getSelectionDescription = (choice: MenuChoice) => {
  const max = choice.maxSelectable || choice.options.length;
  return max === 1 ? "Choose only one" : `Choose up to ${max} options`;
};

export const compareChoices = (
  choices1: CartItemChoices,
  choices2: CartItemChoices
): boolean => {
  // First, keys must match
  const keys1 = Object.keys(choices1);
  const keys2 = Object.keys(choices2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!(key in choices2)) return false;

    const v1 = choices1[key];
    const v2 = choices2[key];

    // If both are arrays, compare sorted
    if (Array.isArray(v1) && Array.isArray(v2)) {
      if (v1.length !== v2.length) return false;

      const sorted1 = [...v1].sort();
      const sorted2 = [...v2].sort();

      for (let i = 0; i < sorted1.length; i++) {
        if (sorted1[i] !== sorted2[i]) return false;
      }
      continue;
    }

    // If one is array and the other isn't — not equal
    if (Array.isArray(v1) || Array.isArray(v2)) return false;

    // Simple primitive comparison
    if (v1 !== v2) return false;
  }

  return true;
};
