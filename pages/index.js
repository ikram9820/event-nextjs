import EventList from "@/components/events/EventList";
import NewsletterRegistration from "@/components/input/newsletter-registration";
import ErrorAlert from "@/components/ui/ErrorAlert";

export default function Home(props) {
  if (!props.events || props.events.length === 0) {
    return <ErrorAlert> There is no featured events</ErrorAlert>;
  }
  return (
    <>
      <NewsletterRegistration />
      <EventList events={props.events} />
    </>
  );
}

export async function getStaticProps(context) {
  const url =
    'https://nextjs-course-e53d9-default-rtdb.asia-southeast1.firebasedatabase.app/events.json?orderBy="isFeatured"&equalTo=true';
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
