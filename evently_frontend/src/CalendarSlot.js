import React from "react";
import DateIcon from "./DateIcon";
import "./CalendarSlot.css"

function CalendarSlot({event}){
    const date  = new Date(event.event_date)
    return(
        <div className="CalendarSlot">
            <div>{event.event_name}</div>
            <div className="date-aside">
            <DateIcon day={date.getDate()} month={date.getMonth()}/>
            </div>
            
        </div>
    )
  
}

export default CalendarSlot;