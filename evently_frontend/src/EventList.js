import React from "react";
import EventCard from "./EventCard";
import "./EventList.css"

function EventList({ events }) {
    return (
        <div className="RsvpList">
            {events.map(event => {
                if(event.rsvp) return <EventCard event={event} />
            })}
        </div>

    )
}

export default EventList;