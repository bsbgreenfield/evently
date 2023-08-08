import React from "react";
import DateIcon from "./DateIcon";
import "./CalendarSlot.css"
import { Link } from "react-router-dom";

function CalendarSlot({event, selectEvent}){
    const date  = new Date(event.event_date)
    const getEventData = () => {
        selectEvent(event)
    }
    return(
        <div className="CalendarSlot" onClick={getEventData}>
            <div>
                <Link to={"/events"}>
                {event.event_name}
                </Link>
                
            </div>
            <div className="date-aside">
            <DateIcon day={date.getDate()} month={date.getMonth()}/>
            </div>
            
        </div>
    )
  
}

export default CalendarSlot;