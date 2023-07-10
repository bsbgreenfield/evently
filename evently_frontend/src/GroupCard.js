import React, { useContext } from "react";
import "./GroupCard.css"
import { useNavigate, Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, ListGroup , ListGroupItem, Button} from "reactstrap";
import userContext from "./UserContext";
import {v4 as uuid} from "uuid"
import UserIcon from "./UserIcon";
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
        <div className="GroupCard" color="rgba(0, 0, 255, 0.4)" >
           <CardTitle >
            <Link to={`/groups/${group.id}`} className="group-card-header">{group.group_name}</Link>
            {currUser.groups.includes(group.id) ?
            <span></span> : <Button onClick={join} className="JoinGroupButton">Join</Button>}
           </CardTitle>
           <div className="group-body-grid">
           <div className="MemberLine">
            Members:<div className="icon-member-box">{<UserIcon/>} +{group.members.length}</div> 
            </div>
            {group.messages ? 
              <div className="message-preview-box">
              {group.messages[group.messages.length -1].content}
              <div className="message-sender">{group.messages[group.messages.length -1].username}</div>
          </div> : <div></div>}
          
           </div>
         
           
        </div>
    )
}

export default GroupCard;