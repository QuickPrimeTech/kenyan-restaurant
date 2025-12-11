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
