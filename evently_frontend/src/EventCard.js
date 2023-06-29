import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import DateIcon from "./DateIcon";
import "./EventCard.css"
function EventCard({event}){
    const date  = new Date(event.event_date)
    return(
        <Card  className="EventCard">

                <CardHeader >
                    <div>
                    { event.event_name}
                    </div>
                    <DateIcon month={date.getMonth()} day={date.getDate()}/>
                </CardHeader>
                <CardBody>
                    <div className="event-location">
                        <svg viewBox="0 0 25 25" fillRule="evenodd" clipRule="evenodd" className="pin">
                            <path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"/>
                        </svg>
                        {event.event_location}
                    </div>
                  
                </CardBody>
        </Card>
       
    )
}

export default EventCard;
