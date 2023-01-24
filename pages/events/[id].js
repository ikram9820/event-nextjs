import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getEventById } from '../../dummy_data';
import EventSummary from '../../components/event-details/event-summary';
import EventLogistics from '../../components/event-details/event-logistics';
import EventContent from '../../components/event-details/event-content';
import ErrorAlert from '../../components/ui/ErrorAlert';

function EventDetailPage() {
  const router = useRouter();

  const eventId = router.query.id;
  const event = getEventById(eventId);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
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
    </Fragment>
  );
}

export default EventDetailPage;