import React, { useContext, useEffect, useState } from "react";
import EventlyApi from "./api";
import { Button, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useParams } from "react-router-dom";
import {v4 as uuid} from "uuid"
import "./GroupDetail.css"
import userContext from "./UserContext";
import CalendarSlot from "./CalendarSlot";
import UserBar from "./UserBar";
import { useToggle } from "./Hooks";
import AddUserForm from "./AddUserForm";
import EventPopOut from "./EventPopOut";
import MessageBoard from "./MessageBoard";
function GroupDetail({currUser}){
    const params = useParams()
    const [modal, setModal] = useToggle();
    const [eventModal, setEventModal] = useToggle();
    const {createGroup, rsvp} = useContext(userContext)
    const [group, setGroup] = useState()
    const [events, setEvents] = useState()
    const [selectedEvent, setSelectedEvent] = useState({})
    const createNewGroup = ( members) => {
        createGroup(group.group_name, members)
        setModal()
     }
     const openEventModal = event => {
        setSelectedEvent(event)
        setEventModal()
     }
     const rsvpForEvent = event_id => {
        rsvp(event_id)
        setEventModal()
     }
    useEffect(() => {
        const getGroupData = async () => {
            let group =  await EventlyApi.getGroup(params.group_id)
            setGroup(group)
            if(!events){
                let groupEvents = await EventlyApi.getEventByGroup(params.group_id)
                setEvents(groupEvents)
            }
            
         }
          getGroupData()
    }, [])
  
    if(group && events){
        return(
            <>
             <div>
                <header>{group.group_name}</header>
                <UserBar users={group.members}/>
                <div className="GroupDetailGrid">
                    <MessageBoard messages={group.messages} currUser={currUser} group_id={group.id}/>
                    <div className="Calendar">
                    <div className="invite-button" onClick={setModal}>
                        <span className="plus">+</span><span>&nbsp;Invite Users</span>
                    </div>
                            {events.events != 'pass' ?
                            events.events.map(event => <CalendarSlot key={uuid()} event={event} selectEvent = {openEventModal}/>)
                        : <div>No events yet</div>}
                    </div>
                </div>
            </div>
            <Modal isOpen={modal} toggle={setModal}>
                <ModalHeader > Add a user </ModalHeader>
                <ModalBody>
                <AddUserForm group_id={group.id} createNewGroup={createNewGroup}/>
                </ModalBody>
            </Modal>
            <Modal isOpen={eventModal} toggle={setEventModal}>
                <ModalHeader > Event in {group.group_name} <Button color = "success" outline className="popout-rsvp" onClick={() => rsvpForEvent(selectedEvent.event_id)}>RSVP</Button></ModalHeader>
                <ModalBody>
                    <EventPopOut event = {selectedEvent}/>
                </ModalBody>
            </Modal>
            </>
           
        )
    }
   
}

export default GroupDetail;