import React, { useContext, useEffect, useState } from "react";
import EventlyApi from "./api";
import { Button, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useParams } from "react-router-dom";
import {v4 as uuid} from "uuid"
import "./GroupDetail.css"
import userContext from "./UserContext";
import Message from "./Message";
import CalendarSlot from "./CalendarSlot";
import UserBar from "./UserBar";
import { useToggle } from "./Hooks";
import AddUserForm from "./AddUserForm";

function GroupDetail(){
    const params = useParams()
    const [modal, setModal] = useToggle();
    const {currUser} = useContext(userContext)
    const [group, setGroup] = useState()
    const [events, setEvents] = useState()
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
        console.log(events)
        return(
            <>
             <div>
                <header>{group.group_name}</header>
                <UserBar users={group.members}/>
                
                <div className="GroupDetailGrid">
                    <div className="MessageBoard">
                        {group.messages.map(message => <Message key={uuid()} message={message}/>)}
                    </div>
                    <div className="Calendar">
                    <div className="invite-button" onClick={setModal}>
                        <span className="plus">+</span><span>&nbsp;Invite Users</span>
                    </div>
                            {events.events != 'pass' ?
                            events.events.map(event => <CalendarSlot key={uuid()} event={event}/>)
                        : <div>No events yet</div>}
                    </div>
                </div>
            </div>
            <Modal isOpen={modal} toggle={setModal}>
            <ModalHeader toggle={setModal}> Add a user </ModalHeader>
            <ModalBody>
               <AddUserForm group_id={group.id}/>
            </ModalBody>
         </Modal>
            </>
           
        )
    }
    return(
        <div>loading...</div>
    )
   
}

export default GroupDetail;