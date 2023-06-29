import React, { useContext, useState } from "react";
import userContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

function EventForm({createEvent}){
    const navigate = useNavigate();
    const {myGroups} = useContext(userContext)
    const initialState = {
        group_id: null,
        event_name : "",
        event_date : "",
        event_location: "",
    
    }
    const [formData, setFormData] = useState(initialState);


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        createEvent({
            group_id: Number(formData.group_id),
            event_name: formData.event_name,
            event_date: formData.event_date,
            event_location: formData.event_location
        })
        navigate('/events')
    }

    if(myGroups.length){
        return(
            <Form>
                <Label htmlFor="groups">Group(optional)</Label>
                <select name = "group_id" id= "group_id" value={formData.group_id} onChange={handleChange}>
                    <option value={null}>None</option>
                    {myGroups.map(group => <option value={group.id}>{group.group_name}</option>)}
                </select>
                <FormGroup>
                    <Label htmlFor="name">Event Name:</Label>
                    <Input name="event_name" id="event_name" value={formData.event_name} onChange={handleChange}/> 
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="date">Date:</Label>
                    <Input type ="date" name="event_date" id="event_date" value={formData.event_date} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="event_location">
                    Location:
                    </Label>
                    <Input name="event_location" id="event_location" value={formData.event_location} onChange={handleChange}/>
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

export default EventForm;