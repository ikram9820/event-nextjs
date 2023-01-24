import EventList from "@/components/events/EventList";
import ErrorAlert from "@/components/ui/ErrorAlert";
import { getFeaturedEvents } from "@/dummy_data";

export default function Home() {
  const featuredEvents = getFeaturedEvents();
  if (!featuredEvents || featuredEvents.length ===0){
    return <ErrorAlert> There is no featured events</ErrorAlert>
  }
  return (
    <>
      <EventList events={featuredEvents} />
    </>
  );
}
