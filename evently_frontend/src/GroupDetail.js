import React, { useEffect, useState } from "react";
import EventlyApi from "./api";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams } from "react-router-dom";
import {v4 as uuid} from "uuid"
import "./GroupDetail.css"

function GroupDetail(){
    const params = useParams()
    const [group, setGroup] = useState()
    const [events, setEvents] = useState()
    useEffect(() => {
        const getGroupData = async () => {
            let group =  await EventlyApi.getGroup(params.group_id)
            console.log(group)
            setGroup(group)
            if(!events){
                let groupEvents = await EventlyApi.getEventByGroup(params.group_id)
                console.log(groupEvents)
                setEvents(groupEvents)
            }
         }
          getGroupData()
    }, [])
   
    if(group && events){
        return(
            <div>
                {group.group_name}
                <div className="GroupDetailGrid">
                    <div className="MessageBoard">
                        {group.messages.map(message => <p key={uuid()}>"{message.content}", - {message.username}</p>)}
                    </div>
                    <div className="Calendar">
                        <ListGroup>
                            {events.events.map(event => <ListGroupItem key={uuid()}>{event.event_name}</ListGroupItem>)}
                        </ListGroup>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div>loading...</div>
    )
   
}

export default GroupDetail;