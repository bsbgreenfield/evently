import React from "react";
import GroupCard from "./GroupCard";
import EventCard from "./EventCard";
import "./DispCard.css"

function DispCard({ styleType, header, data }) {
    return (
        <div className="DispCard">
            <header>{header}</header>
            {header == 'Events' ?
                data.map(event => <EventCard event={event} />)
                : data.map(group => <GroupCard group={group} />)}
            
        </div>
    )
}

export default DispCard