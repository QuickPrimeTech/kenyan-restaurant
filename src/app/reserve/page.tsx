import ReservationHeader from "@/sections/reservetions/ReservationHeader";
import ReservationForm from "@/sections/reservetions/ReservationForm";
import ReservationInfo from "@/sections/reservetions/ReservationInfo";

export default function ReservePage() {
  return (
    <>
      <ReservationHeader />
      <ReservationForm />
      <ReservationInfo />
    </>
  );
}
