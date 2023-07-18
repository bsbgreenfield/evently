import React, { useContext, useState } from "react";
import { Form, FormGroup, Label, Input, Button} from "reactstrap";
import "./EventRecForm.css"
import userContext from "./UserContext";
const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Indianapolis', 'Jacksonville', 'San Francisco', 'Columbus', 'Charlotte', 'Fort Worth', 'Detroit', 'El Paso', 'Memphis', 'Seattle', 'Denver', 'Washington', 'Boston', 'Nashville-Davidson', 'Baltimore', 'Oklahoma City', 'Louisville/Jefferson County', 'Portland', 'Las Vegas', 'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 'Long Beach', 'Kansas City', 'Mesa', 'Virginia Beach', 'Atlanta', 'Colorado Springs', 'Omaha', 'Raleigh', 'Miami', 'Oakland', 'Minneapolis', 'Tulsa', 'Cleveland', 'Wichita', 'Arlington', 'New Orleans', 'Bakersfield', 'Tampa', 'Honolulu', 'Aurora', 'Anaheim', 'Santa Ana', 'St. Louis', 'Riverside', 'Corpus Christi', 'Lexington-Fayette', 'Pittsburgh', 'Anchorage', 'Stockton', 'Cincinnati', 'St. Paul', 'Toledo', 'Greensboro', 'Newark', 'Plano', 'Henderson', 'Lincoln', 'Buffalo', 'Jersey City', 'Chula Vista', 'Fort Wayne', 'Orlando', 'St. Petersburg', 'Chandler', 'Laredo', 'Norfolk', 'Durham', 'Madison', 'Lubbock', 'Irvine', 'Winston-Salem', 'Glendale', 'Garland', 'Hialeah', 'Reno', 'Chesapeake', 'Gilbert', 'Baton Rouge', 'Irving', 'Scottsdale']
function EventRecForm({getEventRecs}) {

    const initialState = {
        city: "",
        keyword: ""
    }
    const [formData, setFormData] = useState(initialState);


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const filters = {};
        for (let [key, val] of Object.entries(formData)) {
            if (val) filters[key] = val;
        }
        getEventRecs(filters)
    }

    return (
        <Form className="EventRecForm">
            <FormGroup>
                <Label htmlFor="city">City:</Label>
                <select name="city" id="city" value={formData.city} onChange={handleChange}>
                    {cities.map(city => <option value={city}>{city}</option>)}
                </select>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="keyword">Keyword:</Label>
                <Input name="keyword" id="keyword" value={formData.keyword} onChange={handleChange} />
            </FormGroup>
            <Button onClick={handleSubmit}>Submit</Button>
        </Form>
    )
}

export default EventRecForm;