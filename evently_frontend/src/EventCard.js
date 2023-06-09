import React from "react";
import { Card, CardBody } from "reactstrap";

function EventCard({event}){
    return(
        <Card color="success">
            <CardBody>
               { event.event_name}
               <ul>
                <li>
                    event.event_date
                </li>
                <li>
                    event.event_location
                </li>
                <footer>From: {event.from_group}</footer>
               </ul>
            </CardBody>
        </Card>
       
    )
}

export default EventCard;