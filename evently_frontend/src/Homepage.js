import React, { useContext, useState } from "react";
import userContext from "./UserContext";
import "./Homepage.css"
import GroupCard from "./GroupCard";
import DispCard from "./DispCard";
import Invites from "./Invites";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useToggle } from "./Hooks";
import Mail from "./Mail"

function Homepage({groups, events}) {

    const { currUser, joinGroup } = useContext(userContext)
    const [modal, setModal] = useToggle();
    const addSelfToGroup = group_id =>{
        joinGroup(group_id)
        setModal()
    }
    if (currUser) {
        return (
            <div>
                <div>
                    <span>Welcome Back {currUser.username}</span>
                    <span onClick={setModal}><Mail invites={currUser.invites} /></span>
                    
                </div>
                <div className="HomeWrapper">
                <div className="HomeGrid">
                   <DispCard  header={"Groups"} data={groups} />
                   <DispCard header={"Events"} data={events}/>
                </div>
            </div>
            <Modal isOpen={modal} toggle={setModal}>
                <ModalHeader toggle={setModal}>Invites</ModalHeader>
                <ModalBody>
                   <Invites invites={currUser.invites} accept={addSelfToGroup}/>
                </ModalBody>
            </Modal>
                </div>

        )
    }
    else return (
        <div>
            Please Log in
        </div>
    )
}

export default Homepage;
