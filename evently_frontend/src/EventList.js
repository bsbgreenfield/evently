import React, { useContext } from "react";
import EventCard from "./EventCard";
import "./EventList.css"
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useToggle } from "./Hooks";
import EventForm from "./eventForm";
import userContext from "./UserContext";
import {v4 as uuid} from "uuid"

function EventList({ events }) {

    const [modal, setModal] = useToggle();

    const {createEvent} = useContext(userContext)

    return (
        <>
         <div className="RsvpList">
            {events.map(event => {
                if(event.rsvp) return <EventCard event={event} key={uuid()}/>
            })}
        </div>
        <div>
            <Button onClick={setModal}>Create New</Button>
        </div>
        <Modal isOpen={modal} toggle={setModal}>
        <ModalHeader toggle={setModal}>Create Event</ModalHeader>
                <ModalBody>
                   <EventForm createEvent={createEvent}/>
                </ModalBody>
                <ModalBody>
                    <Button color="secondary" onClick={setModal}>
                        Cancel
                    </Button>
                </ModalBody>
        </Modal>
        </>
       

    )
}

export default EventList;