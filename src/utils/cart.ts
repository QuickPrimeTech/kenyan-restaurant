import {MenuItem} from "@/types/menu";
import {PickupFormValues} from "@/sections/menu/pickup-dialog";
import {useOrder} from "@/contexts/order-context";
import {timeToMinutes} from "@/utils/time-formatters";

export function useFindAvailability(menuItem:MenuItem){
    const {pickupInfo} = useOrder();
    const pickupMinutes = pickupInfo?.pickupTime
        ? timeToMinutes(pickupInfo.pickupTime): null;

    const startMinutes = timeToMinutes(menuItem.start_time);
    const endMinutes = timeToMinutes(menuItem.end_time);

    return pickupMinutes ?
        (pickupMinutes >= startMinutes &&
            pickupMinutes <= endMinutes): true;
}