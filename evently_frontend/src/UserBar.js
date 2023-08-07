import React from "react";
import UserIcon from "./UserIcon";
import "./UserBar.css"
import {v4 as uuid} from "uuid"

export default function UserBar({users}){
    return(
        <div className="UserBar">
            {users.map(user => <UserIcon user={user} active={true}/>)}
        </div>
    )
}