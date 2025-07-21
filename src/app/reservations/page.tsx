import { ReservationForm } from "@/components/reservations/reservation-form";
import ReservationHeader from "@/sections/reservations/ReservationHeader";

export default function ReservePage() {
  return (
    <>
      <ReservationHeader />
      <ReservationForm />
    </>
  );
}
