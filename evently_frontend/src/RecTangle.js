import React from "react";
import "./RecTangle.css"
function EventRecTangle({event, createEventFromRec}){

    const fillEventInfo = () => {
        createEventFromRec(event)
    }
    if(event.classifications && event.classifications.length){
        return(
            <div>
             <header> {event.classifications.map(cls => <h2 className="eventTitle">{cls.genre ? cls.genre.name: ""}</h2>)}</header>
             <div>
                 <img src = {event.images[0].url} onClick={fillEventInfo}/>
                 <div><a href={event.url}>{event.name}</a></div>
             </div>
            </div> 
         )
    }
}


export default EventRecTangle;