import React, { useContext, useEffect, useState } from "react";
import EventCard from "./EventCard";
import "./EventList.css"
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useToggle } from "./Hooks";
import EventForm from "./eventForm";
import userContext from "./UserContext";
import { v4 as uuid } from "uuid"
import GroupContainer from "./GroupContainer";
import EventRecForm from "./EventRecForm";
import EventRecTangle from "./RecTangle";

function EventList({ events, getEventRecs, currRecs }) {

    const [modal, setModal] = useToggle();
    const [selectedEvent, setSelectedEvent] = useState({});
    const { createEvent, myGroups } = useContext(userContext)

    console.log(currRecs)
    const submitEvent = (eventObj) => {
        createEvent(eventObj)
        setModal()
    }


    const groupsOrdered = {}
    myGroups.forEach(element => {
        groupsOrdered[element.group_name] = []
    });
    events.forEach(event => {
        groupsOrdered[event.from_group].push(event)
    })

    const createEventFromRec = (event) => {
        setSelectedEvent(event)
        setModal()
    }
    return (
        <div>
            <div className="eventTopBar">
                <div className="RecForm">
                    <EventRecForm getEventRecs={getEventRecs} />
                </div>
                <div className="recResults">
                    {currRecs.length ?
                        currRecs.map(event => <EventRecTangle event={event} createEventFromRec = {createEventFromRec}/>) : <>no events found</>}
                </div>
            </div>


            <Button onClick={setModal}>Add New Event</Button>
            <div className="EventListWrapper">
                {myGroups.map(group => {
                    return <GroupContainer group={group} events={groupsOrdered[group.group_name]} />
                })}
            </div>

            <Modal isOpen={modal} toggle={setModal}>
                <ModalHeader toggle={setModal}>Create Event</ModalHeader>
                <ModalBody>
                    <EventForm createEvent={submitEvent} selectedEvent={selectedEvent} />
                </ModalBody>
                <ModalBody>
                    <Button color="secondary" onClick={setModal}>
                        Cancel
                    </Button>
                </ModalBody>
            </Modal>
        </div>


        /*  <>
          <div className="RsvpList">
             {events.map(event => {
                 if(event.rsvp) return <EventCard event={event} key={uuid()}/>
             })}
         </div>
         <div>
             <Button onClick={setModal}>Create New</Button>
         </div>
        
         </>
         */

    )
}

export default EventList;