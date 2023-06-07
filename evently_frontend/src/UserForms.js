import React, { useContext, useState } from "react";
import userContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";


function SignupForm() {
    const navigate = useNavigate()

    const { registerUser } = useContext(userContext)

    const initialState = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    }
    const [formData, setFormData] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        registerUser(formData)
        navigate('/')
    }

    return (
        <Form onSubmit={handleSubmit} style={{width: '50%', marginLeft: '10px'}}>
            <FormGroup>
                <Label htmlFor="username">Username: </Label>
                <Input
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    value={formData.username} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password">Password: </Label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={formData.password} />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="firstName">First Name: </Label>
                <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    onChange={handleChange}
                    value={formData.firstName} />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="lastName">Last Name: </Label>
                <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    onChange={handleChange}
                    value={formData.lastName} />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="email">Email: </Label>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={formData.email} />
            </FormGroup>

            {/*   <Label htmlFor="is_admin">Admin: </Label>
            <select onChange={handleChange}>
                <option value={false}>  </option>
                <option value={true}>true</option>
                <option value={false}>false</option>
            </select> */}

            <Button type="submit">Submit</Button>
        </Form>
    )
}

function LoginForm() {
    const { loginUser } = useContext(userContext)
    const navigate = useNavigate()

    const initialState = {
        username: '',
        password: '',
    }
    const [formData, setFormData] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        loginUser(formData)
        navigate('/')
    }

    return (
        <Form onSubmit={handleSubmit} style={{width: '50%', marginLeft: '10px'}}>
            <Label htmlFor="username">Username: </Label>
            <Input
                type="text"
                name="username"
                id="username"
                onChange={handleChange}
                value={formData.username} />
            <Label htmlFor="password">Password: </Label>
            <Input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={formData.password} />
            <Button type="submit">Submit</Button>
        </Form>
    )
}


function UserUpdateForm({ userdata }) {
    const initialState = {
        username: userdata.username,
        firstName: userdata.firstName,
        lastName: userdata.lastName,
        email: userdata.email
    }
    const { updateUser } = useContext(userContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        updateUser(userdata.username, {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email
        })
        navigate('/')
    }

    return (
        <Form onSubmit={handleSubmit} style={{width: '50%', marginLeft: '10px'}}>
            <Label htmlFor="username" >Username: </Label>
            <Input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                readOnly
                style={{backgroundColor: "#efefef"}} />
            <Label htmlFor="firstName">First Name: </Label>
            <Input
                type="text"
                name="firstName"
                id="firstName"
                onChange={handleChange}
                value={formData.firstName} />
            <Label htmlFor="lastName">Last Name: </Label>
            <Input
                type="text"
                name="lastName"
                id="lastName"
                onChange={handleChange}
                value={formData.lastName} />
            <Label htmlFor="email">Email: </Label>
            <Input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={formData.email} />

            <Button type="submit">Submit</Button>
        </Form>
    )
}

export { SignupForm, LoginForm, UserUpdateForm }