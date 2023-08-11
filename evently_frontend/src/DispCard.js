import React from "react";
import GroupCard from "./GroupCard";
import EventCard from "./EventCard";
import "./DispCard.css"
import {v4 as uuid} from "uuid"


function DispCard({ header, data, currUser}) {
    let rsvpEvents;
    console.log(currUser, data)
    if(header == "Events"){
        data = data.filter(event => event.rsvp == true)
    } else{
        data = data.filter(group => currUser.groups.includes(group.id))
    }
    return (
        <div className="DispCard">
            <header>{header}</header>
            {header == 'Events' ?
                data.map(event => <EventCard event={event} key={uuid()}/>)
                : data.map(group => <GroupCard group={group}  key={uuid()}/>)}
            
        </div>
    )
}

export default DispCard