import React, { useContext, useState, useEffect } from "react";
import userContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import EventlyApi from "./api";
import TempUsersContainer from "./TempUsersContainer";

function GroupForm({createNewGroup, currUser}){
    const [users, setUsers] = useState([])
    useEffect(() => async () => {
        let res = await EventlyApi.getAllUsers()
        let invitableUsers = res.users.filter(user => user.username != currUser.username)
        setUsers(invitableUsers)
    },[])
    const navigate = useNavigate();
    const {myGroups} = useContext(userContext)
    const initialState = {
        group_name : "",
        new_member: null
    }
    const [formData, setFormData] = useState(initialState);


    const handleChange = (e) => {
        const {name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(formData.group_name.trim().length){
            createNewGroup(formData.group_name, tempAddedMembers)
            navigate('/groups')
           
        }
        let groupNameField = document.getElementById("group_name")
        groupNameField.style.border = "1px solid red"
    }

    const [tempAddedMembers, setTempAddedMembers] =useState([])

    const addTempMember = username => {
        if(username != null & username != "None" & !tempAddedMembers.includes(username)) setTempAddedMembers([...tempAddedMembers, username])
    }

  

        return(
            <Form>
                <FormGroup>
                    <Label htmlFor="name">Group Name:</Label>
                    <Input name="group_name" id="group_name" value={formData.group_name} onChange={handleChange}/> 
                </FormGroup>
                <FormGroup>
                    Send an invite to:
                <TempUsersContainer users={tempAddedMembers}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="new_member">Add User:</Label>
                    <select name="new_member" id="new_member" value={formData.new_member} onChange={handleChange}>
                        <option value={null}>None</option>
                        {users.map(user => <option value={user.username}>{user.username}</option>)}
                    </select>
                    <Button onClick={() => addTempMember(formData.new_member)} size="sm" color="primary" style={{"margin": "3px"}}>Add</Button>
                </FormGroup>
                <Button onClick={handleSubmit}>Create</Button>
            </Form>
        )
   
}

export default GroupForm;