import EventsHeader from "@/sections/private-events/EventsHeader";
import EventPackages from "@/sections/private-events/EventPackages";
import EventSpaces from "@/sections/private-events/EventSpaces";
import EventGallery from "@/sections/private-events/EventGallery";
import EventContact from "@/sections/private-events/EventContact";

export default function PrivateEventsPage() {
  return (
    <>
      <EventsHeader />
      <EventPackages />
      <EventSpaces />
      <EventGallery />
      <EventContact />
    </>
  );
}
