import EventList from "@/components/events/EventList";
import { getFeaturedEvents } from "@/dummy_data";

export default function Home() {
  const featuredEvents = getFeaturedEvents();
  return (
    <>
      <EventList events={featuredEvents} />
    </>
  );
}
