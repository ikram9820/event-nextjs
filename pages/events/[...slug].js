import { Fragment, useState, useEffect } from "react";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import {useRouter} from "next/router";
import useSWR from "swr";
function FilteredEventsPage(props) {
  // const filteredEvents = props.events;

  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filterData = router.query.slug;

  const { data, error } = useSWR(
    "https://nextjs-course-e53d9-default-rtdb.asia-southeast1.firebasedatabase.app/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  // if (!filteredEvents) {
  //   return <p className="center">Loading...</p>;
  // }

  // if (props.hasError) {
  //   return (
  //     <Fragment>
  //       <ErrorAlert>
  //         <p>Invalid filter. Please adjust your values!</p>
  //       </ErrorAlert>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>
  //     </Fragment>
  //   );
  // }

  // if (!filteredEvents || filteredEvents.length === 0) {
  //   return (
  //     <Fragment>
  //       <ErrorAlert>
  //         <p>No events found for the chosen filter!</p>
  //       </ErrorAlert>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>
  //     </Fragment>
  //   );
  // }

  // const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;

// export function getFilteredEvents(events, dateFilter) {
//   const { year, month } = dateFilter;

//   let filteredEvents = events.filter((event) => {
//     const eventDate = new Date(event.date);
//     return (
//       eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
//     );
//   });

//   return filteredEvents;
// }

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const year = +params.slug[0]; // here + make string integer
//   const month = +params.slug[1]; // here + make string integer

//   if (
//     isNaN(year) ||
//     isNaN(month) ||
//     year > 2030 ||
//     year < 2021 ||
//     month < 1 ||
//     month > 12
//   ) {
//     return { hasError: true };
//   }

//   var url = `https://nextjs-course-e53d9-default-rtdb.asia-southeast1.firebasedatabase.app/events.json`;
//   const response = await fetch(url);
//   const data = await response.json();
//   let events = [];
//   for (const key in data) {
//     events.push({
//       id: key,
//       ...data[key],
//     });
//   }

//   if (!events) {
//     return { notFound: true };
//   }

//   const filteredEvents = getFilteredEvents(events, { year, month });

//   return {
//     props: { events: filteredEvents, hasError: false, date: { year, month } },
//   };
// }
