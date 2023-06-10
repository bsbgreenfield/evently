import React, { useContext } from "react";
import "./GroupCard.css"
import { useNavigate, Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, ListGroup , ListGroupItem, Button} from "reactstrap";
import userContext from "./UserContext";
import {v4 as uuid} from "uuid"
function GroupCard({group}){
    const navigate = useNavigate()
    const join = async (e) =>{
        e.preventDefault();
        joinGroup(group.id)
        navigate('/')
    }
    const {currUser, joinGroup} = useContext(userContext)
    if (!currUser){
        return(
            <div>Loading...</div>
        )
    }
    return(
        <Card className="GroupCard" color="info">
           <CardTitle>
            <Link to={`/groups/${group.id}`}>{group.group_name}</Link>
            {currUser.groups.includes(group.id) ?
            <span></span> : <Button onClick={join} className="JoinGroupButton">Join</Button>}
            
           </CardTitle>
           <ListGroup className="MemberList" >
           Members: {group.members.map(member => <ListGroupItem key={uuid()}>{member.username}</ListGroupItem>)}
           </ListGroup>
           
        </Card>
    )
}

export default GroupCard;