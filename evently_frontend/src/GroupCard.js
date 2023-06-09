import React from "react";
import "./GroupCard.css"
import { Card, CardBody, CardTitle, CardText, ListGroup , ListGroupItem} from "reactstrap";
function GroupCard({group}){
    return(
        <Card className="GroupCard" color="info">
           <CardTitle>{group.group_name}</CardTitle>
           <ListGroup className="MemberList" >
           Members: {group.members.map(member => <ListGroupItem>{member.username}</ListGroupItem>)}
           </ListGroup>
           
        </Card>
    )
}

export default GroupCard;