import React from "react";
import {v4 as uuid} from "uuid"
import "./TempUsersContainer.css"

export default function TempUsersContainer({users}){
    return (
        <div className="tempUsers">
            {users.map(user => <div key={uuid()} className="tempUserBox">{user}</div>)}
        </div>
    )
}