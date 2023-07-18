import React from "react";

function EventRecTangle({event}){
    return(
       <div>
        <header> {event.classifications.map(cls => <h2>{cls.genre.name}</h2>)}</header>
        <div>
            <img src = {event.images[0].url}/>
            <div><a href={event.url}>{event.name}</a></div>
        </div>
       </div> 
    )
}


export default EventRecTangle;