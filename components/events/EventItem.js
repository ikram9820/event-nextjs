import classes from "./event-item.module.css";
import Button from "../ui/Button";
import DateIcon from "../icon/DateIcon";
import AddressIcon from "../icon/AddressIcon";
import ArrowRightIcon from "../icon/ArrowRightIcon";
import Image from "next/image";

function EventItem({ event }) {
  const readableDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = event.location.replace(", ", "\n");
  const path = `/events/${event.id}`;

  return (
    <li className={classes.item}>
      <Image
        src={"/" + event.image}
        alt={event.title}
        width={250}
        height={160}
      />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{event.title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{readableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
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
