import { useEffect, useState } from "react";
import React from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import EventlyApi from "./api";

function AddUserForm({group_id, createNewGroup}){
    const [users, setUsers] = useState([])
    useEffect(() => async () => {
        let res = await EventlyApi.getAllUsers()
        const nonmembers = res.users.filter(user => !user.groups.includes(group_id))
        setUsers(nonmembers)
    },[])
    const initialState = {
        user : ""
    }
    const [formData, setFormData] = useState(initialState);
    const handleChange = (e) => {
        const {value } = e.target
        setFormData({ user: value})
    }
    
    const handleSubmit = async e => {
        createNewGroup([formData.user])
        
    }
    return(
        <Form>
        <FormGroup>
            <Label htmlFor="name">User:</Label>
            <select name="user" id="user" value={formData.user} onChange={handleChange}> 
                <option value={null}>None</option>
                {users.map(user => <option value={user.username}>{user.username}</option>
                )}
            </select>
        </FormGroup>
        <Button onClick={handleSubmit}>Add</Button>
    </Form>
    )
}

export default AddUserForm;