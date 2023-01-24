
import EventItem from "./EventItem";
import classes from './event-list.module.css';

function EventList({events}){

    return(
        <div className={classes.list}>
        {events.map((event)=> <EventItem key={event.id} event={event}/>) }
        </div>
    );
}

export default EventList