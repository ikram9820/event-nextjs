import classes from "./event-item.module.css";
import Button from "../ui/Button";
import DateIcon from "../icon/DateIcon";
import AddressIcon from "../icon/AddressIcon";
import ArrowRightIcon from "../icon/ArrowRightIcon";

function EventItem({ event }) {
  const readableTime = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formatedAddress = event.location.replace(", ", "\n");
  const path = `/events/${event.id}`;

  return (
    <li className={classes.item}>
      <img src={'/'+event.image} alt={event.title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h1>{event.title}</h1>
        </div>
        <div className={classes.date}>
          <DateIcon />
          <time>{readableTime}</time>
        </div>
        <div className={classes.address}>
          <AddressIcon />
          <address>{formatedAddress}</address>
        </div>
        <div className={classes.actions}>
          <Button link={path}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}
export default EventItem;
