import React, { useContext, useEffect, useState } from "react";
import GroupCard from "./GroupCard";
import EventlyApi from "./api";
import userContext from "./UserContext";
import "./GroupsList.css"
import { v4 as uuid } from "uuid"
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useToggle } from "./Hooks";
import GroupForm from "./GroupForm";
import AddUserForm from "./AddUserForm";

function GroupList() {
   const [modal, setModal] = useToggle();
   const { currUser, createGroup} = useContext(userContext)
   const [groups, setGroups] = useState([])
   const createNewGroup = (group_name, members) => {
      createGroup(group_name, members)
      setModal()
   }
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
               <GroupForm createNewGroup={createNewGroup} currUser = {currUser}/>
            </ModalBody>

         </Modal>
      </div>


   )
}

export default GroupList;