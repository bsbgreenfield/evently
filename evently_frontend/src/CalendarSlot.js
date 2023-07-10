import React from "react";
import DateIcon from "./DateIcon";
import "./CalendarSlot.css"
import { Link } from "react-router-dom";

function CalendarSlot({event}){
    const date  = new Date(event.event_date)
    return(
        <div className="CalendarSlot">
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