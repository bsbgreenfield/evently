import React, { useContext, useState, useEffect } from "react";
import userContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import EventlyApi from "./api";
import TempUsersContainer from "./TempUsersContainer";

function GroupForm({createGroup}){
    const [users, setUsers] = useState([])
    useEffect(() => async () => {
        let res = await EventlyApi.getAllUsers()
        setUsers(res.users)
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
        console.log(formData)
    }

    const handleSubmit = e => {
        e.preventDefault()
        createGroup(formData.group_name, tempAddedMembers)
        navigate('/groups')
    }

    const [tempAddedMembers, setTempAddedMembers] =useState([])

    const addTempMember = username => {
        console.log(username)
        if(username != "None" & !tempAddedMembers.includes(username)) setTempAddedMembers([...tempAddedMembers, username])
    }

  
    if(myGroups.length){
        return(
            <Form>
                <FormGroup>
                    <Label htmlFor="name">Group Name:</Label>
                    <Input name="group_name" id="group_name" value={formData.group_name} onChange={handleChange}/> 
                </FormGroup>
                <FormGroup>
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
    else{
        return(
            <div>Loading..</div>
        )
    }
   
}

export default GroupForm;