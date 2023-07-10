import React, { useContext, useEffect, useState } from "react";
import GroupCard from "./GroupCard";
import EventlyApi from "./api";
import userContext from "./UserContext";
import "./GroupsList.css"
import { v4 as uuid } from "uuid"
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useToggle } from "./Hooks";
import GroupForm from "./GroupForm";

function GroupList() {
   const [modal, setModal] = useToggle();
   const { currUser, createGroup} = useContext(userContext)
   const [groups, setGroups] = useState([])
   
   useEffect(() => {
      const getGroups = async function () {
         let allGroups = await EventlyApi.getAllGroups()
         setGroups(allGroups)
      }
      getGroups()
   }, [])

   if (!currUser) {
      return <div>must be logged in</div>
   }
   if (!groups.length) {
      return (
         <div>Loading...</div>
      )
   }
   return (
      <div>
         <div>
            <Button onClick={setModal}>
               Create a Group
            </Button>
         </div>
         <div className="GroupsList">
            {groups.map(group => <GroupCard group={group} key={uuid()} />)}
         </div>
         <Modal isOpen={modal} toggle={setModal}>
            <ModalHeader toggle={setModal}> Create Group </ModalHeader>
            <ModalBody>
               <GroupForm createGroup={createGroup}/>
            </ModalBody>
            <ModalBody>
               <Button color="secondary" onClick={setModal}>
                  Cancel
               </Button>
            </ModalBody>
         </Modal>
      </div>


   )
}

export default GroupList;