import { Fragment } from "react";
import { useRouter } from "next/router";

import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/events-search";

function AllEventsPage(props) {
  const router = useRouter();
  const events = props.events;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </Fragment>
  );
}

export default AllEventsPage;

export async function getStaticProps(context) {
  const url =
    'https://nextjs-course-e53d9-default-rtdb.asia-southeast1.firebasedatabase.app/events.json';
  const events = [];
  const response = await fetch(url);
  const data = await response.json();
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return { props: { events } };
}
