import React, { useContext, useState } from "react";
import userContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

function GroupForm({createGroup}){
    const navigate = useNavigate();
    const {myGroups} = useContext(userContext)
    const initialState = {
        group_name : ""
    }
    const [formData, setFormData] = useState(initialState);


    const handleChange = (e) => {
        const {value } = e.target
        setFormData({ group_name: value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        createGroup(formData.group_name)
        navigate('/groups')
    }

    if(myGroups.length){
        return(
            <Form>
                <FormGroup>
                    <Label htmlFor="name">Group Name:</Label>
                    <Input name="group_name" id="group_name" value={formData.group_name} onChange={handleChange}/> 
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