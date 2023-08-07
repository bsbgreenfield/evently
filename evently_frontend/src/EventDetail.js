import React, { useEffect, useState } from "react";
import DateIcon from "./DateIcon";
import EventlyApi from "./api";
import EventCard from "./EventCard";
import GroupCard from "./GroupCard";
import { useParams } from "react-router-dom";
export default function EventDetail(){
    const params = useParams()
    const [group, setGroup] = useState({})
    const [event, setEvent] = useState({})
    useEffect(()=> {
        const getEvent = async () => {
            let e = await EventlyApi.getEvent(params.event_id)
            setEvent(e.event)
           
        }
        const getGroup = async () => {
            let g = await EventlyApi.getGroup(event.group_id)
            setGroup(g)
        }
      if(!Object.keys(event).length)getEvent()
      if (Object.keys(event).length) getGroup()
    }, [params.event_id, event])
if (Object.keys(group).length && Object.keys(event).length){
    return( <EventCard event={event}/>)
}
else{
    return(
       <>loading</>
    )
}
  
}