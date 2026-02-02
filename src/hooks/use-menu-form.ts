import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createItemSchema } from "@/schemas/menu";
import { calculateTotalPrice } from "@/helpers/menu";
import { CartOptions, RawCartOptions } from "@/types/cart";
import { MenuChoice } from "@/types/menu";
import { useOrderStore } from "@/stores/use-order-store";

type UseMenuFormProps = {
    choices: MenuChoice[];
    defaultQuantity?: number;
    defaultValues?: Partial<CartOptions>;
    basePrice: number;
    onAdd?: (data: RawCartOptions, totalPrice: number) => void;
};

export function useMenuForm({
    choices,
    defaultQuantity = 1,
    defaultValues,
    basePrice,
    onAdd,
}: UseMenuFormProps) {
    const choicesSchema = useMemo(
        () => createItemSchema(choices, defaultQuantity),
        [choices, defaultQuantity]
    );

    const { pickupInfo, setOpenDialog } = useOrderStore();

    const form = useForm({
        resolver: zodResolver(choicesSchema),
        defaultValues: {
            quantity: defaultValues?.quantity ?? defaultQuantity,
            specialInstructions: defaultValues?.specialInstructions ?? "",
            ...defaultValues?.choices,
        },
        reValidateMode: "onChange",
    });

    const watchedValues = form.watch();
    const totalPrice = calculateTotalPrice(watchedValues, choices, basePrice);

    const handleSubmit = (data: RawCartOptions) => {
        const pickupInfoComplete = pickupInfo.pickupDate && pickupInfo.pickupTime;
        if (!pickupInfoComplete) {
            setOpenDialog(true);
            return;
        }
        onAdd?.(data, totalPrice);
        form.reset();
    };

    const onSubmit = form.handleSubmit(
        (data) => handleSubmit(data as RawCartOptions),
        (errors) => {
            const firstErrorField = Object.keys(errors)[0];
            if (firstErrorField) {
                const el = document.getElementById(firstErrorField);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    (el as HTMLElement).focus({ preventScroll: true });
                }
            }
        }
    );

    return {
        form,
        choicesSchema,
        totalPrice,
        onSubmit,
    };
}
