import React from "react";
import DateIcon from "./DateIcon";
import "./CalendarSlot.css"
import { Link } from "react-router-dom";

function CalendarSlot({ event, selectEvent, currUser }) {
    console.log("$$$$$", currUser)
    const date = new Date(event.event_date)
    const getEventData = () => {
        selectEvent(event)
    }
    return (
        <div className="slot-wrapper" onClick={getEventData}>
            <header>
                {event.participants.includes(currUser.id) ?
                    <span className="Attending-Tag">Attending</span> : <span></span>}
            </header>
            <div className="CalendarSlot" >


                <div>
                    <Link to={"/events"}>
                        {event.event_name}
                    </Link>
                </div>
                <div className="date-aside">
                    <DateIcon day={date.getDate()} month={date.getMonth()} />
                </div>



            </div>
        </div>

    )

}

export default CalendarSlot;