import React from "react";
import UserIcon from "./UserIcon";
import "./UserBar.css"

export default function UserBar({users}){
    return(
        <div className="UserBar">
            {users.map(user => <UserIcon user={user}/>)}
        </div>
    )
}