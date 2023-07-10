import React from "react";
import EventCard from "./EventCard";
import "./GroupContainer.css"

function GroupContainer({group, events}){
    console.log(group, events)
    return(
        <div className="ContainerWrapper">
            <header>{group.group_name}</header>
            <div className="GroupContainer">
                {events.map(event => <EventCard event={event}/>)}
            </div>
        </div>
    )
}


export default GroupContainer;