import { Fragment } from "react";
import EventSummary from "../../components/event-details/event-summary";
import EventLogistics from "../../components/event-details/event-logistics";
import EventContent from "../../components/event-details/event-content";
import Comments from "@/components/input/comments";

function EventDetailPage(props) {
  const event = props.event;
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId = {event.id}/>
    </Fragment>
  );
}

export default EventDetailPage;

export async function getStaticProps(context) {
  const id = context.params.id;
  const url = `https://nextjs-course-e53d9-default-rtdb.asia-southeast1.firebasedatabase.app/events/${id}.json`;

  const response = await fetch(url);
  const data = await response.json();
  if (!data){
    return {notFound:true}
  }
  const event = {
    id: id,
    ...data,
  };
  return { props: { event: event }, revalidate: 60 };
}

export async function getStaticPaths() {
  const url =
    "https://nextjs-course-e53d9-default-rtdb.asia-southeast1.firebasedatabase.app/events.json";
  let paths = [];
  const response = await fetch(url);
  const data = await response.json();
  for (const key in data) {
    paths.push({ params: { id: key } });
  }
  return {
    paths: paths,
    fallback: true,
  };
}
