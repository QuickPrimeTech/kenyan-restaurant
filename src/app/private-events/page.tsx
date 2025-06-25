import EventsHeader from "@/pages/private-events/EventsHeader";
import EventPackages from "@/pages/private-events/EventPackages";
import EventSpaces from "@/pages/private-events/EventSpaces";
import EventGallery from "@/pages/private-events/EventGallery";
import EventContact from "@/pages/private-events/EventContact";

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
