import React, { useEffect, useState } from "react";
import DateIcon from "./DateIcon";
import EventlyApi from "./api";
import "./eventPopOut.css"
export default function EventPopOut({event}){
    let date = new Date(event.event_date)
    const [participants, setParticipants] = useState([])
    useEffect(() =>  {
        const retrieveUsers = async () =>{
            let results = await EventlyApi.getUsersbyIds(event.participants)
            console.log(results)
            setParticipants(results.userList)
        }
       if(event.participants.length) retrieveUsers()
    },[])
    return(
        <div>
            <header>{event.event_name}</header>
            <div><strong>When:</strong> {date.toString()}</div>
            <div><strong>Where:</strong> {event.event_location}</div>
            <div><strong>Participants:</strong>
            {participants.length ? <ul>{participants.map(user => <li className="participant">{user.username} ({user.first_name} {user.last_name})</li>)}</ul> : <>No participants yet</>}
            </div>
        </div>
      
    )
}